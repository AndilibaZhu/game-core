/*
 * @Author: Andy
 * @Date: 2022-07-26 21:53:51
 * @LastEditTime: 2022-08-06 16:02:53
 */
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RequestReturn } from '../../interface/defalt.interface';
import { LoginForm, LoginSuccess, User } from '../../interface/user.interface';
import { addSalt, encript } from '../../utils/Encription';
import { nanoid } from 'nanoid';
import { redis } from '../../db/redis';
import dataMap from '../../db/dataMap';
import { WsconnectGateway } from '../wsconnect/wsconnect.gateway';
import { UserInfo } from '../../interface/userInfo.interface';
const logger = new Logger('login.controller');
@Injectable()
export class LoginService {
  constructor(
    @InjectModel('USER_MODEL') private readonly userModel: Model<User>,
    @InjectModel('USERINFO_MODEL') private readonly userInfoModel: Model<UserInfo>,
    private readonly ws: WsconnectGateway,
  ) {}

  //登录
  async login(user: LoginForm): Promise<RequestReturn<LoginSuccess>> {
    const userDoc = await this.userModel.findOne({ username: user.username });
    if (!userDoc) {
      //创建新用户
      const newsalt = addSalt();

      await this.userModel.create({
        username: user.username,
        password: encript(user.password, newsalt),
        salt: newsalt,
        userDataID: await this.initUser(user.username),
      });

      const token = nanoid();
      //redis存储token并设置10秒过期
      redis.setex(user.username, 10, token);
      return {
        code: 200,
        msg: '创建新用户',
        data: {
          token: token,
        },
      };
    }
    //验证是否被禁用
    if (userDoc.isBaned) {
      return {
        code: -1,
        msg: '账号被禁用',
      };
    }
    //验证WS是否在线
    if (
      dataMap.wsSidMap.has(user.username) &&
      (await this.ws.server.allSockets()).has(dataMap.wsSidMap.get(user.username))
    ) {
      logger.log(
        '账号在线-' +
          user.username +
          '-' +
          (await this.ws.server.allSockets()).has(dataMap.wsSidMap.get(user.username)),
      );
      this.kickout(user);
      return {
        code: -1,
        msg: '账号在其他地方登录!已踢出,请重新登陆！',
      };
    }
    //验证密码
    if (encript(user.password, userDoc.salt) === userDoc.password) {
      const token = nanoid();
      //redis存储token并设置10秒过期

      if ((await redis.get(user.username)) === null) {
        redis.setex(user.username, 10, token);
        return {
          code: 200,
          msg: '登录成功',
          data: {
            token: token,
          },
        };
      } else {
        return {
          code: -1,
          msg: '重复登录，请稍后再试。' + ((await redis.ttl(user.username)) + '秒后可再次登录'),
        };
      }
    }
  }
  //踢出在线玩家
  async kickout(user: LoginForm) {
    //获取玩家信息
    const userDoc = await this.userModel.findOne({ username: user.username });
    //验证密码
    if (encript(user.password, userDoc.salt) === userDoc.password) {
      //获取玩家wsid
      const wsid = dataMap.wsSidMap.get(user.username);
      //踢出玩家
      this.ws.server.in(wsid).disconnectSockets();
    }
  }
  //初始化玩家数据
  async initUser(uname: string): Promise<string> {
    //初始化玩家数据
    console.log(uname);
    const userInfo = await this.userInfoModel.create({
      username: uname,
    });
    console.log(userInfo);
    return userInfo._id;
  }
}

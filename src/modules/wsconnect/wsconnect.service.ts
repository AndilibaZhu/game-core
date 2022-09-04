/*
 * @Author: Andy
 * @Date: 2022-07-24 22:12:41
 * @LastEditTime: 2022-09-03 21:22:21
 */
import { Injectable } from '@nestjs/common';
import { redis } from '../../db/redis';
import { Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../interface/user.interface';
import DATA from '../../db/dataMap';
import { UserInfo } from 'src/interface/userInfo.interface';
const logger = new Logger('wsGateway');
@Injectable()
export class WsconnectService {
  constructor(@InjectModel('USER_MODEL') private readonly userModel: Model<User>, @InjectModel('USERINFO_MODEL') private readonly userInfoModel: Model<UserInfo>) {}
  async handShakeCheck(socket: Socket): Promise<boolean> {
    const token = socket.handshake.auth.token;
    const username = socket.handshake.auth.username;

    const redisToken = await redis.get(socket.handshake.auth.username);
    //redis.set('WSsid.' + username, socket.id);

    if (redisToken === token) {
      //记录IP地址到数据库
      const ip = socket.handshake.address;
      await this.userModel.findOneAndUpdate({ username: username }, { IPAddress: ip });
      logger.log('初始化-' + username);
      DATA.wsSidMap.set(username, socket.id);
      socket['username'] = username;
      socket.join('world');
      const res = await this.userInfoModel.findOne({ username: username });
      if (res) {
        DATA.USERINFODATA.set(res.username, res);
      } else {
        socket.disconnect(true);
      }
      return true;
    } else {
      return false;
    }
  }
  //async handleConnected(socket: Socket) {}
  async handleDisconnect(socket: Socket) {
    const userInfo = DATA.USERINFODATA.get(socket['username']);
    await this.userInfoModel.findByIdAndUpdate(userInfo._id, userInfo);

    DATA.USERINFODATA.delete(socket['username']);
  }
  async getBasicInfo(client: Socket) {
    return DATA.USERINFODATA.get(client['username']).basicInfo;
  }
}

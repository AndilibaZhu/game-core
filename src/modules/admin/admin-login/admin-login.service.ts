/*
 * @Author: Andy
 * @Date: 2022-08-03 15:23:19
 * @LastEditTime: 2022-08-03 21:34:51
 */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, Token } from '../../../interface/adminInterface/admin.interface';
import { ID, RequestReturn } from '../../../interface/defalt.interface';
import { LoginForm, User } from '../../../interface/user.interface';
import { UserInfo } from '../../../interface/userInfo.interface';
import { addSalt, encript } from '../../../utils/Encription';

@Injectable()
export class AdminLoginService {
  constructor(
    @InjectModel('ADMIN_MODEL') private readonly adminUserModel: Model<Admin>,
    @InjectModel('USER_MODEL') private readonly userModel: Model<User>,
    @InjectModel('USERINFO_MODEL') private readonly userInfoModel: Model<UserInfo>,
    private readonly jwtService: JwtService,
  ) {}

  async checkLogin(user: LoginForm): Promise<RequestReturn<Token>> {
    const admin = await this.adminUserModel.findOne({ adminname: user.username });
    console.log(user);
    if (!admin) {
      return {
        code: -1,
        msg: '用户名不存在',
      };
    }
    if (admin.password !== user.password) {
      return {
        code: -2,
        msg: '密码错误',
      };
    }
    const access = this.jwtService.sign(user);
    console.log(access);
    return {
      code: 200,
      msg: '登录成功',
      data: {
        token: access,
      },
    };
  }
  //获取所有用户
  async getAllUser(): Promise<RequestReturn<User[]>> {
    const users = await this.userModel.find();
    return {
      code: 200,
      msg: '获取成功',
      data: users,
    };
  }
  //删除指定用户
  async deleteUser(id: ID): Promise<RequestReturn<undefined>> {
    const user = await this.userModel.findByIdAndUpdate(
      id.id,
      {
        isDelete: true,
      },
      { new: true },
    );
    if (user.isDeleted) {
      return {
        code: 200,
        msg: '删除成功',
      };
    } else {
      return {
        code: -1,
        msg: '删除失败',
      };
    }
  }
  //增加用户
  async addUser(user: LoginForm): Promise<RequestReturn<undefined>> {
    const userDoc = await this.userModel.findOne({ username: user.username });
    if (!userDoc) {
      const newsalt = addSalt();
      const userInfo = await this.userInfoModel.create({
        username: user.username,
      });
      await this.userModel.create({
        username: user.username,
        password: encript(user.password, newsalt),
        salt: newsalt,
        userDataID: userInfo._id,
      });
      return {
        code: 200,
        msg: '添加成功',
      };
    }
    return {
      code: -1,
      msg: '用户名已存在',
    };
  }
}

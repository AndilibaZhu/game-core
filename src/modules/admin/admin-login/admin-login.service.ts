/*
 * @Author: Andy
 * @Date: 2022-08-03 15:23:19
 * @LastEditTime: 2022-08-11 21:10:48
 */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, Token } from '../../../interface/adminInterface/admin.interface';
import { PageReturn, RequestReturn } from '../../../interface/defalt.interface';
import { LoginForm, SearchOption, User } from '../../../interface/user.interface';
import { UserInfo } from '../../../interface/userInfo.interface';
import { addSalt, encript } from '../../../utils/Encription';
//const logger = new Logger('adminlogin.server');
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
    if (!admin) {
      return {
        code: -1,
        msg: '用户名不存在',
      };
    }
    if (admin.password !== encript(user.password, admin.salt)) {
      return {
        code: -2,
        msg: '密码错误',
      };
    }
    //更新登录时间
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
  async getAllUser(searchOption: SearchOption): Promise<RequestReturn<PageReturn<User[]>>> {
    const { pageInfo, searchData } = searchOption;
    const { pageNo, pageLimit } = pageInfo;
    const total = await this.userModel.countDocuments(searchData);
    const users = await this.userModel
      .find(searchData)
      .skip((pageNo - 1) * pageLimit)
      .limit(pageLimit);
    return {
      code: 200,
      msg: '获取成功',
      data: {
        pageNo: pageNo,
        pageSize: Math.ceil(total / pageLimit),
        total: total,
        records: users,
      },
    };
  }
  //删除指定用户
  async deleteUser(params: { id: string; isDeleted: boolean }): Promise<RequestReturn<undefined>> {
    const user = await this.userModel.findByIdAndUpdate(
      params.id,
      {
        isDeleted: params.isDeleted,
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
        code: 200,
        msg: '恢复成功',
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
      // await this.adminUserModel.create({        adminname: user.username,        password: encript(user.password, newsalt),        salt: newsalt,      });
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
  //封号
  async banUser(params: { id: string; isBaned: boolean }): Promise<RequestReturn<undefined>> {
    const user = await this.userModel.findByIdAndUpdate(
      params.id,
      {
        isBaned: params.isBaned,
      },
      { new: true },
    );
    if (user.isBaned) {
      return {
        code: 200,
        msg: '封号成功',
      };
    } else {
      return {
        code: 200,
        msg: '解封成功',
      };
    }
  }
}

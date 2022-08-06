/*
 * @Author: Andy
 * @Date: 2022-08-03 15:23:18
 * @LastEditTime: 2022-08-06 16:03:22
 */
import { Body, Controller, Logger, Post, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ID } from 'src/interface/defalt.interface';
import { qqMsg } from '../../../game/qqMsg';
import { LoginForm } from 'src/interface/user.interface';
import { AdminLoginService } from './admin-login.service';
const logger = new Logger('adminlogin.controller');
@Controller('admin-login')
export class AdminLoginController {
  constructor(public readonly adminLoginService: AdminLoginService) {}
  @UseGuards(AuthGuard('jwt'))
  @Get('test')
  async test() {
    // 测试qq消息发送
    qqMsg.pickFriend(648474134).sendMsg('你好啊1');
    return 'test';
  }
  //登录
  @Post('checkLogin')
  async checkLogin(@Body() user: LoginForm) {
    try {
      const res = await this.adminLoginService.checkLogin(user);
      return res;
    } catch (error) {
      logger.error(error);
    }
  }
  //获取所有用户
  @Get('getAllUsers')
  @UseGuards(AuthGuard('jwt'))
  async getAllUser() {
    try {
      const res = await this.adminLoginService.getAllUser();
      return res;
    } catch (error) {
      logger.error(error);
    }
  }
  //删除指定用户
  @Post('deleteUser')
  @UseGuards(AuthGuard('jwt'))
  async deleteUser(@Body() id: ID) {
    try {
      const res = await this.adminLoginService.deleteUser(id);
      return res;
    } catch (error) {
      logger.error(error);
    }
  }
  //增加用户
  @Post('addUser')
  @UseGuards(AuthGuard('jwt'))
  async addUser(@Body() user: LoginForm) {
    try {
      const res = await this.adminLoginService.addUser(user);
      return res;
    } catch (error) {
      logger.error(error);
    }
  }
}

/*
 * @Author: Andy
 * @Date: 2022-08-03 15:23:18
 * @LastEditTime: 2022-08-11 17:58:53
 */
import { Body, Controller, Logger, Post, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { qqMsg } from '../../../game/qqMsg';
import { LoginForm, SearchOption } from '../../../interface/user.interface';
import { AdminLoginService } from './admin-login.service';
import { segment } from 'oicq';
const logger = new Logger('adminlogin.controller');
@Controller('admin-login')
export class AdminLoginController {
  constructor(public readonly adminLoginService: AdminLoginService) {}
  @UseGuards(AuthGuard('jwt'))
  @Get('test')
  async test() {
    // 测试qq消息发送
    //qqMsg.pickFriend(648474134).sendMsg('测试消息，TESTAPI发送');
    await qqMsg.pickGroup(739708567).sendMsg([segment.at('all'), '测试消息，TESTAPI发送']);
    logger.log(await qqMsg.pickGroup(739708567).getAtAllRemainder());
    return 'test';
  }
  //登录
  @Post('checkLogin')
  async checkLogin(@Body() user: LoginForm) {
    try {
      await this.adminLoginService.addUser(user);
      const res = await this.adminLoginService.checkLogin(user);
      return res;
    } catch (error) {
      logger.error(error);
    }
  }
  //获取所有用户
  @Post('getAllUsers')
  @UseGuards(AuthGuard('jwt'))
  async getAllUser(@Body() searchOption: SearchOption) {
    try {
      const res = await this.adminLoginService.getAllUser(searchOption);
      return res;
    } catch (error) {
      logger.error(error);
    }
  }
  //删除指定用户
  @Post('deleteUser')
  @UseGuards(AuthGuard('jwt'))
  async deleteUser(@Body() params: { id: string; isDeleted: boolean }) {
    try {
      const res = await this.adminLoginService.deleteUser(params);
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
  @Post('banUser')
  @UseGuards(AuthGuard('jwt'))
  async banUser(@Body() params: { id: string; isBaned: boolean }) {
    try {
      const res = await this.adminLoginService.banUser(params);
      return res;
    } catch (error) {
      logger.error(error);
    }
  }
}

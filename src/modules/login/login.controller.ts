/*
 * @Author: Andy
 * @Date: 2022-07-26 21:53:41
 * @LastEditTime: 2022-08-23 22:46:33
 */
import { Controller, Logger, Post, Body } from '@nestjs/common';
import { LoginForm } from '../../interface/user.interface';
import { LoginService } from './login.service';
const logger = new Logger('login.controller');
@Controller('user')
export class LoginController {
  constructor(public readonly loginService: LoginService) {}
  //登录
  @Post('login')
  async checkLogin(@Body() user: LoginForm) {
    try {
      const res = await this.loginService.login(user);
      return res;
    } catch (error) {
      logger.error(error.message);
      return {
        code: -1,
        msg: error.message,
      };
    }
  }
}

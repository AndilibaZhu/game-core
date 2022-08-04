/*
 * @Author: Andy
 * @Date: 2022-07-26 21:53:59
 * @LastEditTime: 2022-07-28 17:37:42
 */
import { Module } from '@nestjs/common';

import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { WsconnectModule } from '../wsconnect/wsconnect.module';

@Module({
  imports: [WsconnectModule],
  providers: [LoginService],
  controllers: [LoginController],
})
export class LoginModule {}

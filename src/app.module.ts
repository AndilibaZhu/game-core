/*
 * @Author: Andy
 * @Date: 2022-07-24 16:04:06
 * @LastEditTime: 2022-08-03 22:40:20
 */
import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { Log4jsModule } from '@nestx-log4js/core';
import { ConfigModule } from '@nestjs/config';
import { LoginModule } from './modules/login/login.module';
import { WsconnectModule } from './modules/wsconnect/wsconnect.module';
import { WstestModule } from './modules/wstest/wstest.module';
import { AdminLoginModule } from './modules/admin/admin-login/admin-login.module';
import { AdminGoodsModule } from './modules/admin/admin-goods/admin-goods.module';
import { AdminEquipsModule } from './modules/admin/admin-equips/admin-equips.module';

@Module({
  imports: [
    DbModule,
    ConfigModule.forRoot(),
    Log4jsModule.forRoot(),
    WsconnectModule,
    LoginModule,
    WstestModule,
    AdminLoginModule,
    AdminGoodsModule,
    AdminEquipsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

/*
 * @Author: Andy
 * @Date: 2022-07-24 16:04:06
 * @LastEditTime: 2022-08-24 22:25:50
 */
import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { Log4jsModule } from '@nestx-log4js/core';
import { ConfigModule } from '@nestjs/config';
import { LoginModule } from './modules/login/login.module';
import { WsconnectModule } from './modules/wsconnect/wsconnect.module';
import { AdminLoginModule } from './modules/admin/admin-login/admin-login.module';
import { AdminGoodsModule } from './modules/admin/admin-goods/admin-goods.module';
import { AdminEquipsModule } from './modules/admin/admin-equips/admin-equips.module';
import { AdminCitiesModule } from './modules/admin/admin-cities/admin-cities.module';
import { AdminNpcsModule } from './modules/admin/admin-npcs/admin-npcs.module';
import { WsChatModule } from './modules/ws_chat/ws_chat.module';
import { WsTravelModule } from './modules/ws_travel/ws_travel.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    DbModule,
    ConfigModule.forRoot(),
    Log4jsModule.forRoot(),
    WsconnectModule,
    LoginModule,
    AdminLoginModule,
    AdminGoodsModule,
    AdminEquipsModule,
    AdminCitiesModule,
    AdminNpcsModule,
    WsChatModule,
    WsTravelModule,
    TasksModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

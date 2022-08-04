/*
 * @Author: Andy
 * @Date: 2022-07-24 22:12:41
 * @LastEditTime: 2022-07-28 17:36:31
 */
import { Module } from '@nestjs/common';
import { WsconnectService } from './wsconnect.service';
import { WsconnectGateway } from './wsconnect.gateway';

@Module({
  providers: [WsconnectGateway, WsconnectService],
  exports: [WsconnectService, WsconnectGateway],
})
export class WsconnectModule {}

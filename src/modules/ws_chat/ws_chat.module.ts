/*
 * @Author: Andy
 * @Date: 2022-08-20 20:02:06
 * @LastEditTime: 2022-08-22 15:21:59
 */
import { Module } from '@nestjs/common';
import { WsChatService } from './ws_chat.service';
import { WsChatGateway } from './ws_chat.gateway';
import { WsconnectModule } from '../wsconnect/wsconnect.module';

@Module({
  imports: [WsconnectModule],
  providers: [WsChatGateway, WsChatService],
  exports: [WsChatService, WsChatGateway],
})
export class WsChatModule {}

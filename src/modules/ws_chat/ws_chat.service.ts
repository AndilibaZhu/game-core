/*
 * @Author: Andy
 * @Date: 2022-08-20 20:02:06
 * @LastEditTime: 2022-09-04 12:34:35
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat, ChatMessage } from '../../interface/chat.interface';
import { WsconnectGateway } from '../wsconnect/wsconnect.gateway';
import { redis } from '../../db/redis';
import { qqMsg } from '../../game/qqMsg';
@Injectable()
export class WsChatService {
  constructor(@InjectModel('CHAT_MODEL') private readonly chatModel: Model<Chat>, private readonly ws: WsconnectGateway) {}
  //server = this.ws.server;
  async sendmsg(chatMessage: ChatMessage) {
    if ((await redis.get(chatMessage.fr + '_chat')) === null) {
      redis.setex(chatMessage.fr + '_chat', 20, 1);
    } else {
      return { msg: '喝口水，慢点说。' + ((await redis.ttl(chatMessage.fr + '_chat')) + '秒') };
    }

    switch (chatMessage.t) {
      case 'world':
        //聊天内容存入数据库
        await this.chatModel.create({ from: chatMessage.fr, to: chatMessage.to, t: chatMessage.t, content: chatMessage.co });
        this.ws.server.to('world').emit('worldMessage', { fr: chatMessage.fr, co: chatMessage.co });
        return { msg: '发送成功' };
        break;
      case 'group':
        break;
      case 'district':
        break;
      case 'private':
        break;

      default:
        break;
    }
  }
  async sendqq(chatMessage: string) {
    await qqMsg.pickGroup(739708567).sendMsg('测试消息，TESTAPI发送' + chatMessage);
  }
}

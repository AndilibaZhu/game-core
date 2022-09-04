/*
 * @Author: Andy
 * @Date: 2022-08-20 20:02:06
 * @LastEditTime: 2022-08-23 22:49:14
 */
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatMessage } from '../../interface/chat.interface';
import { WsChatService } from './ws_chat.service';

@WebSocketGateway({
  cors: true,
  path: '/ws',
  pingTimeout: 1000,
  pingInterval: 3000,
})
export class WsChatGateway {
  constructor(readonly wsChatService: WsChatService) {}
  @WebSocketServer()
  public server: Server;
  @SubscribeMessage('sendmsg')
  sendmsg(@MessageBody() chatMessage: ChatMessage, @ConnectedSocket() client: Socket) {
    chatMessage.fr = client['username'];
    return this.wsChatService.sendmsg(chatMessage);
  }
}

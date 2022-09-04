/*
 * @Author: Andy
 * @Date: 2022-08-23 23:13:09
 * @LastEditTime: 2022-09-01 22:27:24
 */
//import { Logger } from '@nestjs/common';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WsTravelService } from './ws_travel.service';
//const logger = new Logger('ws_travel');
@WebSocketGateway({
  cors: true,
  path: '/ws',
  pingTimeout: 1000,
  pingInterval: 3000,
})
export class WsTravelGateway {
  constructor(private readonly wsTravelService: WsTravelService) {}
  @WebSocketServer()
  server: Server;
  @SubscribeMessage('posInit')
  posInit(@ConnectedSocket() client: Socket) {
    return this.wsTravelService.posInit(client);
  }
  @SubscribeMessage('walk')
  playerWalk(@ConnectedSocket() client: Socket, @MessageBody() data: string) {
    return this.wsTravelService.playerWalk(client, data);
  }
  @SubscribeMessage('jump')
  playerChangeMap(@ConnectedSocket() client: Socket, @MessageBody() data: string) {
    return this.wsTravelService.playerChangeMap(client, data);
  }
}

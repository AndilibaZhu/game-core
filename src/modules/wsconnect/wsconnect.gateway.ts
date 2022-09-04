/*
 * @Author: Andy
 * @Date: 2022-07-24 22:12:41
 * @LastEditTime: 2022-09-03 21:44:59
 */
import { WebSocketGateway, SubscribeMessage, ConnectedSocket, WebSocketServer, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WsconnectService } from './wsconnect.service';
import { Logger } from '@nestjs/common';
//import * as customParser from 'socket.io-msgpack-parser';
import dataMap from '../../db/dataMap';
const logger = new Logger('wsGateway');
//  parser: customParser,
@WebSocketGateway({
  cors: true,
  path: '/ws',
  pingTimeout: 1000,
  pingInterval: 3000,
})
export class WsconnectGateway implements OnGatewayInit {
  constructor(private readonly wsconnectService: WsconnectService) {}
  @WebSocketServer()
  server: Server;
  @SubscribeMessage('reconnect')
  handleReconnect(@ConnectedSocket() client: Socket) {
    logger.debug('重新连接-' + client['username']);
  }
  @SubscribeMessage('connection')
  handleConnection(@ConnectedSocket() client: Socket) {
    // this.wsconnectService.handleConnected(client);
    logger.debug('连接成功-' + client['username']);

    //this.server.allSockets().then((res) => logger.log(res.has(client.id)));
  }
  @SubscribeMessage('disconnect')
  handleDisconnect(@ConnectedSocket() client: Socket) {
    dataMap.wsSidMap.delete(client['username']);
    this.wsconnectService.handleDisconnect(client);
    logger.debug('断开连接-' + client['username']);
  }
  //握手验证
  afterInit(server: Server) {
    server.use(async (socket, next) => {
      const res = await this.wsconnectService.handShakeCheck(socket);
      if (res) {
        next();
      } else {
        next(new Error('invalid'));
      }
    });
  }
  @SubscribeMessage('connect_error')
  handleConnectError(err) {
    logger.error(err.message);
  }
  @SubscribeMessage('getBasicInfo')
  getBasicInfo(@ConnectedSocket() client: Socket) {
    return this.wsconnectService.getBasicInfo(client);
  }
}

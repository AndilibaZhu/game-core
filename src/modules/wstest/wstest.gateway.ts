/*
 * @Author: Andy
 * @Date: 2022-07-27 23:11:22
 * @LastEditTime: 2022-07-28 11:31:51
 */
import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { WstestService } from './wstest.service';

@WebSocketGateway({
  cors: true,
  path: '/ws',
  pingTimeout: 1000,
  pingInterval: 3000,
})
export class WstestGateway {
  constructor(private readonly wstestService: WstestService) {}

  @SubscribeMessage('createWstest')
  create(@MessageBody() id: number) {
    return this.wstestService.create();
  }

  @SubscribeMessage('disconnect')
  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log('断开连接-' + client['username']);
  }
  @SubscribeMessage('findAllWstest')
  findAll() {
    return this.wstestService.findAll();
  }

  @SubscribeMessage('findOneWstest')
  findOne(@MessageBody() id: number) {
    return this.wstestService.findOne(id);
  }

  @SubscribeMessage('updateWstest')
  update(@MessageBody() id: number) {
    return this.wstestService.update(1);
  }

  @SubscribeMessage('removeWstest')
  remove(@MessageBody() id: number) {
    return this.wstestService.remove(id);
  }
}

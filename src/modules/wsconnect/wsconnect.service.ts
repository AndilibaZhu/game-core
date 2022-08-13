/*
 * @Author: Andy
 * @Date: 2022-07-24 22:12:41
 * @LastEditTime: 2022-08-11 21:40:19
 */
import { Injectable } from '@nestjs/common';
import { redis } from '../../db/redis';
import { Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../interface/user.interface';
import dataMap from '../../db/dataMap';
const logger = new Logger('wsGateway');
@Injectable()
export class WsconnectService {
  constructor(@InjectModel('USER_MODEL') private readonly userModel: Model<User>) {}
  async handShakeCheck(socket: Socket): Promise<boolean> {
    const token = socket.handshake.auth.token;
    const username = socket.handshake.auth.username;
    //记录IP地址到数据库
    const ip = socket.handshake.address;
    await this.userModel.findOneAndUpdate({ username: username }, { IPAddress: ip });
    logger.log('初始化-' + username);
    dataMap.wsSidMap.set(username, socket.id);
    socket['username'] = username;
    const redisToken = await redis.get(socket.handshake.auth.username);
    //redis.set('WSsid.' + username, socket.id);

    if (redisToken === token) {
      return true;
    } else {
      return false;
    }
  }

  create() {
    return 'This action adds a new wsconnect';
  }

  findAll() {
    return `This action returns all wsconnect`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wsconnect`;
  }

  update(id: number) {
    return `This action updates a #${id} wsconnect`;
  }

  remove(id: number) {
    return `This action removes a #${id} wsconnect`;
  }
}

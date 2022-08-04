/*
 * @Author: Andy
 * @Date: 2022-08-03 21:39:42
 * @LastEditTime: 2022-08-03 22:43:23
 */
import { Module } from '@nestjs/common';
import { AdminGoodsController } from './admin-goods.controller';
import { AdminGoodsService } from './admin-goods.service';

@Module({
  providers: [AdminGoodsService],
  controllers: [AdminGoodsController],
})
export class AdminGoodsModule {}

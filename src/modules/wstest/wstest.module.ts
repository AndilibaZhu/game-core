/*
 * @Author: Andy
 * @Date: 2022-07-27 23:11:22
 * @LastEditTime: 2022-07-27 23:12:54
 */
import { Module } from '@nestjs/common';
import { WstestService } from './wstest.service';
import { WstestGateway } from './wstest.gateway';

@Module({
  providers: [WstestGateway, WstestService],
})
export class WstestModule {}

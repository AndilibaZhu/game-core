/*
 * @Author: Andy
 * @Date: 2022-08-23 23:13:09
 * @LastEditTime: 2022-08-23 23:15:41
 */
import { Module } from '@nestjs/common';
import { WsTravelService } from './ws_travel.service';
import { WsTravelGateway } from './ws_travel.gateway';

@Module({
  providers: [WsTravelGateway, WsTravelService],
  exports: [WsTravelGateway, WsTravelService],
})
export class WsTravelModule {}

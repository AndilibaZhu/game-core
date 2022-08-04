/*
 * @Author: Andy
 * @Date: 2022-08-03 22:39:59
 * @LastEditTime: 2022-08-03 22:46:16
 */
import { Module } from '@nestjs/common';
import { AdminEquipsController } from './admin-equips.controller';
import { AdminEquipsService } from './admin-equips.service';

@Module({
  providers: [AdminEquipsService],
  controllers: [AdminEquipsController],
})
export class AdminEquipsModule {}

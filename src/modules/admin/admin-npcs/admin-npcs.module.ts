/*
 * @Author: Andy
 * @Date: 2022-08-07 17:24:59
 * @LastEditTime: 2022-08-07 17:26:14
 */
import { Module } from '@nestjs/common';
import { AdminNpcsController } from './admin-npcs.controller';
import { AdminNpcsService } from './admin-npcs.service';

@Module({
  providers: [AdminNpcsService],
  controllers: [AdminNpcsController],
})
export class AdminNpcsModule {}

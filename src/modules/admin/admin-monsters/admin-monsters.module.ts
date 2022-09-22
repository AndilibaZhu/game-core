/*
 * @Author: Andy
 * @Date: 2022-09-07 14:44:04
 * @LastEditTime: 2022-09-07 14:45:55
 */
import { Module } from '@nestjs/common';
import { AdminMonstersController } from './admin-monsters.controller';
import { AdminMonstersService } from './admin-monsters.service';
@Module({
  providers: [AdminMonstersService],
  controllers: [AdminMonstersController],
})
export class AdminMonstersModule {}

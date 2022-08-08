/*
 * @Author: Andy
 * @Date: 2022-08-06 16:36:41
 * @LastEditTime: 2022-08-07 17:18:30
 */
import { Module } from '@nestjs/common';
import { AdminCitiesController } from './admin-cities.controller';
import { AdminCitiesService } from './admin-cities.service';

@Module({
  providers: [AdminCitiesService],
  controllers: [AdminCitiesController],
})
export class AdminCitiesModule {}

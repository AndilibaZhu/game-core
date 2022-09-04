/*
 * @Author: Andy
 * @Date: 2022-08-24 22:07:06
 * @LastEditTime: 2022-08-24 22:09:06
 */
import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Module({
  providers: [TasksService],
})
export class TasksModule {}

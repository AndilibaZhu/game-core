/*
 * @Author: Andy
 * @Date: 2022-08-24 22:08:17
 * @LastEditTime: 2022-08-24 23:08:24
 */
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Timeout } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { City } from 'src/interface/city.interface';
import DATA from '../../db/dataMap';
@Injectable()
export class TasksService {
  constructor(@InjectModel('CITY_MODEL') private readonly cityModel: Model<City>) {}
  private readonly logger = new Logger('定时任务');
  @Timeout(1000) //1秒只执行一次
  async dataInit() {
    this.logger.log('数据初始化');
    const data = await this.cityModel.find({});
    data.forEach((item) => {
      DATA.CITIESDATA.set(String(item._id), item);
    });

    //this.logger.log(data);
  }
}

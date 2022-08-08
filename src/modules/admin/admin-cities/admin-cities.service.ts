/*
 * @Author: Andy
 * @Date: 2022-08-06 16:36:40
 * @LastEditTime: 2022-08-07 17:07:30
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { City } from 'src/interface/city.interface';
import { ID } from '../../../interface/defalt.interface';
@Injectable()
export class AdminCitiesService {
  constructor(@InjectModel('CITY_MODEL') private readonly citiesModel: Model<City>) {}
  //获取所有城市
  async getAllCities() {
    const cities = await this.citiesModel.find();
    return {
      code: 200,
      msg: '获取成功',
      data: cities,
    };
  }
  //删除指定城市
  async delCities(id: ID) {
    const cities = await this.citiesModel.findByIdAndDelete(id.id);
    return {
      code: 200,
      msg: '删除成功',
      data: cities,
    };
  }
  //增加城市
  async addCities(cities: City) {
    const res = await this.citiesModel.create(cities);
    return {
      code: 200,
      msg: '增加成功',
      data: res,
    };
  }
  //修改城市
  async updateCities(cities: City) {
    const res = await this.citiesModel.findByIdAndUpdate(cities._id, cities, { new: true });
    return {
      code: 200,
      msg: '修改成功',
      data: res,
    };
  }
}

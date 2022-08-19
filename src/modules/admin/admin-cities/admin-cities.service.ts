/*
 * @Author: Andy
 * @Date: 2022-08-06 16:36:40
 * @LastEditTime: 2022-08-13 15:31:58
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { City, SearchOption } from 'src/interface/city.interface';
import { ID } from '../../../interface/defalt.interface';
@Injectable()
export class AdminCitiesService {
  constructor(@InjectModel('CITY_MODEL') private readonly citiesModel: Model<City>) {}
  //获取所有城市
  async getAllCities(options: SearchOption) {
    const { pageInfo, searchData } = options;

    const { pageNo, pageLimit } = pageInfo;
    const total = await this.citiesModel.countDocuments(searchData);
    const cities = await this.citiesModel
      .find(searchData)
      .skip((pageNo - 1) * pageLimit)
      .limit(pageLimit);
    return {
      code: 200,
      msg: '获取城市成功',
      data: {
        pageNo: pageNo,
        pageSize: Math.ceil(total / pageLimit),
        total: total,
        records: cities,
      },
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
  //获取所有城市的简介
  async getAllCitiesSimple() {
    const cities = await this.citiesModel.find({}, { dec: 1, cityName: 1, isCity: 1, isCapital: 1, raid: 1, level: 1, tags: 1, isRaid: 1 });
    return {
      code: 200,
      msg: '获取成功',
      data: cities,
    };
  }
  async getOneCity(id: ID) {
    const city = await this.citiesModel.findById(id.id);
    return {
      code: 200,
      msg: '获取成功',
      data: city,
    };
  }
}

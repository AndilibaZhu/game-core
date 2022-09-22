/*
 * @Author: Andy
 * @Date: 2022-09-07 14:44:03
 * @LastEditTime: 2022-09-07 15:09:10
 */

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { ID } from 'src/interface/defalt.interface';
import { Monster, SearchOption } from '../../../interface/monster.interface';

@Injectable()
export class AdminMonstersService {
  constructor(@InjectModel('MONSTER_MODEL') private readonly monsterModel: Model<Monster>) {}
  //获取所有怪物
  async getAllMonsters(options: SearchOption) {
    const { pageInfo, searchInfo } = options;
    const { pageNo, pageLimit } = pageInfo;
    const total = await this.monsterModel.countDocuments(searchInfo);
    const monsters = await this.monsterModel
      .find(searchInfo)
      .skip((pageNo - 1) * pageLimit)
      .limit(pageLimit);
    return {
      code: 200,
      msg: '获取怪物成功',
      data: {
        pageNo: pageNo,
        pageSize: Math.ceil(total / pageLimit),
        total: total,
        records: monsters,
      },
    };
  }
  //删除指定怪物
  async delMonsters(id: ID) {
    const monsters = await this.monsterModel.findByIdAndDelete(id.id);
    return {
      code: 200,
      msg: '删除成功',
      data: monsters,
    };
  }
  //增加怪物
  async addMonsters(monsters: Monster) {
    const res = await this.monsterModel.create(monsters);
    return {
      code: 200,
      msg: '增加成功',
      data: res,
    };
  }
  //修改怪物
  async updateMonsters(monsters: Monster) {
    const res = await this.monsterModel.findByIdAndUpdate(monsters._id, monsters, { new: true });
    return {
      code: 200,
      msg: '修改成功',
      data: res,
    };
  }
}

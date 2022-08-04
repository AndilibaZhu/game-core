/*
 * @Author: Andy
 * @Date: 2022-08-03 22:39:57
 * @LastEditTime: 2022-08-03 22:55:07
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ID } from '../../../interface/defalt.interface';
import { EquipsData } from '../../../interface/goodsInfo.interface';

@Injectable()
export class AdminEquipsService {
  constructor(@InjectModel('EQUIPSDATA_MODEL') private readonly equipsModel: Model<EquipsData>) {}
  //获取所有装备
  async getAllEquips() {
    const equips = await this.equipsModel.find();
    return {
      code: 200,
      msg: '获取成功',
      data: equips,
    };
  }
  //删除指定装备
  async delEquips(id: ID) {
    const equips = await this.equipsModel.findByIdAndDelete(id.id);
    return {
      code: 200,
      msg: '删除成功',
      data: equips,
    };
  }
  //增加装备
  async addEquips(equips: EquipsData) {
    const res = await this.equipsModel.create(equips);
    return {
      code: 200,
      msg: '增加成功',
      data: res,
    };
  }
  //修改装备
  async updateEquips(equips: EquipsData) {
    const res = await this.equipsModel.findByIdAndUpdate(equips._id, equips, { new: true });
    return {
      code: 200,
      msg: '修改成功',
      data: res,
    };
  }
  //获取分类
  async getFilter() {
    const type = await this.equipsModel.distinct('type');
    const color = await this.equipsModel.distinct('color');
    return {
      code: 200,
      msg: '获取成功',
      data: {
        type: type,
        color: color,
      },
    };
  }
}

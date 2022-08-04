/*
 * @Author: Andy
 * @Date: 2022-08-03 21:39:41
 * @LastEditTime: 2022-08-03 22:20:24
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ID } from 'src/interface/defalt.interface';
import { GoodsData } from 'src/interface/goodsInfo.interface';

@Injectable()
export class AdminGoodsService {
  constructor(@InjectModel('GOODSDATA_MODEL') private readonly goodsModel: Model<GoodsData>) {}
  //获取所有商品
  async getAllGoods() {
    const goods = await this.goodsModel.find();
    return {
      code: 200,
      msg: '获取成功',
      data: goods,
    };
  }
  //删除指定商品
  async delGoods(id: ID) {
    const goods = await this.goodsModel.findByIdAndDelete(id.id);
    return {
      code: 200,
      msg: '删除成功',
      data: goods,
    };
  }
  //增加商品
  async addGoods(goods: GoodsData) {
    const newGoods = this.goodsModel.create(goods);
    return {
      code: 200,
      msg: '增加成功',
      data: newGoods,
    };
  }
  //修改商品
  async updateGoods(goods: GoodsData) {
    const newGoods = await this.goodsModel.findByIdAndUpdate(goods._id, goods, { new: true });
    return {
      code: 200,
      msg: '修改成功',
      data: newGoods,
    };
  }
}

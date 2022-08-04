/*
 * @Author: Andy
 * @Date: 2022-08-03 21:39:40
 * @LastEditTime: 2022-08-03 22:52:44
 */

import { Body, Controller, Logger, Post, Get, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { ID } from '../../../interface/defalt.interface';
import { GoodsData } from '../../../interface/goodsInfo.interface';
import { AdminGoodsService } from './admin-goods.service';
const logger = new Logger('adminGoods.controller');
@UseGuards(AuthGuard('jwt'))
@Controller('admin-goods')
export class AdminGoodsController {
  constructor(public readonly adminGoodsService: AdminGoodsService) {}
  //获取所有商品
  @Get('getAllGoods')
  async getAllGoods() {
    try {
      const res = await this.adminGoodsService.getAllGoods();
      return res;
    } catch (error) {
      logger.error(error);
    }
  }
  //删除指定商品
  @Post('delGoods')
  async delGoods(@Body() id: ID) {
    try {
      const res = await this.adminGoodsService.delGoods(id);
      return res;
    } catch (error) {
      logger.error(error);
    }
  }
  //增加商品
  @Post('addGoods')
  async addGoods(@Body() goods: GoodsData) {
    try {
      const res = await this.adminGoodsService.addGoods(goods);
      return res;
    } catch (error) {
      logger.error(error);
    }
  }
  //修改商品
  @Post('updateGoods')
  async updateGoods(@Body() goods: GoodsData) {
    try {
      const res = await this.adminGoodsService.updateGoods(goods);
      return res;
    } catch (error) {
      logger.error(error);
    }
  }
}

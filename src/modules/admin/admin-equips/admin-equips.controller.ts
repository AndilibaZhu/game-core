/*
 * @Author: Andy
 * @Date: 2022-08-03 22:39:56
 * @LastEditTime: 2022-08-03 22:57:23
 */
import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { ID } from '../../../interface/defalt.interface';
import { EquipsData } from '../../../interface/goodsInfo.interface';
import { AdminEquipsService } from './admin-equips.service';
const logger = new Logger('adminEquips.controller');
@Controller('admin-equips')
export class AdminEquipsController {
  constructor(public readonly adminEquipsService: AdminEquipsService) {}
  //获取所有装备
  @Post('getAllEquips')
  async getAllEquips(@Body() id: ID) {
    try {
      const res = await this.adminEquipsService.getAllEquips();
      return res;
    } catch (error) {
      logger.error(error);
    }
  }
  //删除指定装备
  @Post('delEquips')
  async delEquips(@Body() id: ID) {
    try {
      const res = await this.adminEquipsService.delEquips(id);
      return res;
    } catch (error) {
      logger.error(error);
    }
  }
  //增加装备
  @Post('addEquips')
  async addEquips(@Body() equips: EquipsData) {
    try {
      const res = await this.adminEquipsService.addEquips(equips);
      return res;
    } catch (error) {
      logger.error(error);
    }
  }
  //修改装备
  @Post('updateEquips')
  async updateEquips(@Body() equips: EquipsData) {
    try {
      const res = await this.adminEquipsService.updateEquips(equips);
      return res;
    } catch (error) {
      logger.error(error);
    }
  }
  //获取分类
  @Get('getFilter')
  async getFilter() {
    try {
      const res = await this.adminEquipsService.getFilter();
      return res;
    } catch (error) {
      logger.error(error);
    }
  }
}

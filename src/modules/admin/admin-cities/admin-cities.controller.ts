/*
 * @Author: Andy
 * @Date: 2022-08-06 16:36:39
 * @LastEditTime: 2022-08-13 14:45:46
 */

import { Body, Controller, Get, Logger, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { City, SearchOption } from '../../../interface/city.interface';
import { ID } from '../../../interface/defalt.interface';
import { AdminCitiesService } from './admin-cities.service';
const logger = new Logger('adminCities.controller');

@Controller('admin-cities')
@UseGuards(AuthGuard('jwt'))
export class AdminCitiesController {
  constructor(public readonly adminCitiesService: AdminCitiesService) {}
  //获取所有城市

  @Post('getAllCities')
  async getAllCities(@Body() options: SearchOption) {
    try {
      const res = await this.adminCitiesService.getAllCities(options);
      return res;
    } catch (error) {
      logger.error(error);
    }
  }
  //删除指定城市
  @Post('delCities')
  async delCities(@Body() id: ID) {
    try {
      const res = await this.adminCitiesService.delCities(id);
      return res;
    } catch (error) {
      logger.error(error);
    }
  }
  //增加城市
  @Post('addCities')
  async addCities(@Body() cities: City) {
    try {
      const res = await this.adminCitiesService.addCities(cities);
      return res;
    } catch (error) {
      logger.error(error);
    }
  }
  //修改城市
  @Post('updateCities')
  async updateCities(@Body() cities: City) {
    try {
      const res = await this.adminCitiesService.updateCities(cities);
      return res;
    } catch (error) {
      logger.error(error);
    }
  }
  @Get('getAllCitiesSimple')
  async getAllCitiesSimple() {
    try {
      const res = await this.adminCitiesService.getAllCitiesSimple();
      return res;
    } catch (error) {
      logger.error(error);
    }
  }
  @Post('getOneCity')
  async getOneCity(@Body() id: ID) {
    try {
      const res = await this.adminCitiesService.getOneCity(id);
      return res;
    } catch (error) {
      logger.error(error);
    }
  }
}

/*
 * @Author: Andy
 * @Date: 2022-09-07 14:44:02
 * @LastEditTime: 2022-09-07 15:03:55
 */
import { Body, Controller, Logger, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ID } from 'src/interface/defalt.interface';
import { Monster, SearchOption } from 'src/interface/monster.interface';
import { AdminMonstersService } from './admin-monsters.service';
const logger = new Logger('adminMonsters.controller');
@Controller('admin-monsters')
@UseGuards(AuthGuard('jwt'))
export class AdminMonstersController {
  constructor(public readonly adminMonstersService: AdminMonstersService) {}
  //获取所有怪物
  @Post('getAllMonsters')
  async getAllMonsters(@Body() options: SearchOption) {
    try {
      const res = await this.adminMonstersService.getAllMonsters(options);
      return res;
    } catch (error) {
      logger.error(error);
    }
  }
  //删除指定怪物
  @Post('delMonsters')
  async delMonsters(@Body() id: ID) {
    try {
      const res = await this.adminMonstersService.delMonsters(id);
      return res;
    } catch (error) {
      logger.error(error);
    }
  }
  //增加怪物
  @Post('addMonsters')
  async addMonsters(@Body() monsters: Monster) {
    try {
      const res = await this.adminMonstersService.addMonsters(monsters);
      return res;
    } catch (error) {
      logger.error(error);
    }
  }
  //修改怪物
  @Post('updateMonsters')
  async updateMonsters(@Body() monsters: Monster) {
    try {
      const res = await this.adminMonstersService.updateMonsters(monsters);
      return res;
    } catch (error) {
      logger.error(error);
    }
  }
}

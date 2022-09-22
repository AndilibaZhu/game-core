/*
 * @Author: Andy
 * @Date: 2022-08-24 22:08:17
 * @LastEditTime: 2022-09-21 23:32:37
 */
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Timeout } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { City } from 'src/interface/city.interface';
import DATA from '../../db/dataMap';
import { customAlphabet } from 'nanoid';
import { randomNum } from 'src/game/defaltFunc';
import { Monster, MonsterUnit } from 'src/interface/monster.interface';
const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 6);

@Injectable()
export class TasksService {
  constructor(@InjectModel('CITY_MODEL') private readonly cityModel: Model<City>, @InjectModel('MONSTER_MODEL') private readonly monsterModel: Model<Monster>) {}

  private readonly logger = new Logger('定时任务');
  @Timeout(1000) //1秒只执行一次
  async dataInit() {
    this.logger.log('数据初始化');

    //初始化城市数据
    const cityData = await this.cityModel.find({});
    cityData.forEach((item) => {
      DATA.CITIESDATA.set(String(item._id), item);
    });
    //初始化所有怪物数据
    const monsterData = await this.monsterModel.find({});
    monsterData.forEach((item) => {
      DATA.MONSTERDATA.set(String(item._id), item);
    });
    //初始化地图怪物数据
    for (let i = 0; i < cityData.length; i++) {
      DATA.MAPUNITDATA[cityData[i]._id] = new Map();
    }
    //初始化地图单位数据
    for (let i = 0; i < cityData.length; i++) {
      const mapUnits = cityData[i].mapUnits;
      for (let j = 0; j < mapUnits.length; j++) {
        const unit = mapUnits[j];
        DATA.MAPUNITDATA[cityData[i]._id].set(unit.Id, unit);
      }
    }
    //this.logger.log(data);
  }
  //@Cron('45 * * * * *') //该方法每分钟执行一次，在第 45 秒执行。
  @Timeout(2000) //1秒只执行一次
  async monsterRefresh() {
    this.logger.log('怪物刷新');
    //检查世界地图怪物是否需要刷新
    //map类型为cityID和这个城市中的怪物Unit
    //遍历城市，检查每个城市的怪物是否需要刷新
    for (const cityID in DATA.MAPUNITDATA) {
      //根据城市信息获取这个地图怪物的ID和数量
      const city = DATA.CITIESDATA.get(cityID);
      //生成城市中现有怪物的坐标点
      const monsterUnit = new Map();
      DATA.MAPUNITDATA[cityID].forEach((item) => {
        if (item.t === 7) {
          monsterUnit.set(item.x + '-' + item.y, (item as MonsterUnit).moId);
        }
      });
      //挨个检查每种怪物是否需要刷新
      for (let i = 0; i < city.monsters.length; i++) {
        const cityMonster = city.monsters[i];
        const ids = [...monsterUnit.values()];
        const alreadyNum = ids.filter((item) => item === cityMonster.id).length;
        //如果怪物数量不足，刷新怪物
        if (alreadyNum < cityMonster.count) {
          //刷新怪物
          const needRefreshNum = cityMonster.count - alreadyNum;
          this.logger.log(DATA.CITIESDATA.get(cityID).cityName + '|刷新怪物:' + DATA.MONSTERDATA.get(cityMonster.id).monsterName + needRefreshNum);

          for (let j = 0; j < needRefreshNum; j++) {
            const x = randomNum(0, city.mapSize - 1);
            const y = randomNum(0, city.mapSize - 1);
            if (monsterUnit.has(x + '-' + y)) {
              j--;
              continue;
            }
            const id = nanoid();

            DATA.MAPUNITDATA[cityID].set(id, new MonsterUnit(DATA.MONSTERDATA.get(cityMonster.id), id, x, y));
          }
        }
      }
    }
    //console.log(DATA.MAPUNITDATA);
  }
}

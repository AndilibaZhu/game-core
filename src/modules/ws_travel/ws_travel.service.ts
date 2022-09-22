/*
 * @Author: Andy
 * @Date: 2022-08-23 23:13:09
 * @LastEditTime: 2022-09-22 22:33:03
 */
import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { CitySimple } from 'src/interface/city.interface';
import DATA from '../../db/dataMap';

@Injectable()
export class WsTravelService {
  async posInit(client: Socket) {
    const userinfo = DATA.USERINFODATA.get(client['username']);
    const pos = userinfo.pos;
    const cityInfo = DATA.CITIESDATA.get(pos.mapid);
    const mapUnits = [...DATA.MAPUNITDATA[pos.mapid].values()];

    return {
      mapUnits: mapUnits,
      pos: pos,
      cityInfo: new CitySimple(cityInfo),
    };
  }
  async playerWalk(client: Socket, data: string) {
    const userinfo = DATA.USERINFODATA.get(client['username']);
    const posNew = data.split('|');
    if (Math.abs(Number(posNew[0]) - userinfo.pos.x) > 1 || Math.abs(Number(posNew[1]) - userinfo.pos.y) > 1) {
      return 0;
    }
    if (Math.sqrt(Math.abs(Number(posNew[0]) - userinfo.pos.x) + Math.abs(Number(posNew[1]) - userinfo.pos.y)) > 1.5) {
      return 0;
    } else {
      userinfo.pos.x = Number(posNew[0]);
      userinfo.pos.y = Number(posNew[1]);
      DATA.USERINFODATA.set(client['username'], userinfo);
      return 1;
    }
  }
  async playerChangeMap(client: Socket, data: string) {
    const userinfo = DATA.USERINFODATA.get(client['username']);
    const nowMapId = userinfo.pos.mapid;
    const newCity = DATA.CITIESDATA.get(data);
    if (newCity) {
      for (let i = 0; i < newCity.mapUnits.length; i++) {
        const unit = newCity.mapUnits[i];
        if (unit.Id == nowMapId) {
          userinfo.pos.x = unit.x;
          userinfo.pos.y = unit.y;
          userinfo.pos.mapid = data;
          DATA.USERINFODATA.set(client['username'], userinfo);
          return 1;
        }
      }
      return 0;
    } else {
      return 0;
    }
  }
}

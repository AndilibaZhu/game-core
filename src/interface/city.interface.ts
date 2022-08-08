/*
 * @Author: Andy
 * @Date: 2022-08-04 17:14:24
 * @LastEditTime: 2022-08-08 14:33:53
 */
import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CityDocument = City & Document;
@Schema()
export class City extends Document {
  @Prop()
  lastCity: string[];
  @Prop()
  nextCity: string[];
  @Prop({ unique: true })
  cityName: string;
  @Prop()
  isCity: boolean;
  @Prop()
  isCapital: boolean;
  @Prop()
  level: number;
  @Prop()
  dec: string;
  @Prop()
  monsters: string[];
  @Prop()
  NPCS: string[];
  @Prop()
  Buff: string[];
  @Prop()
  prestigeName: string; //声望名称
  @Prop()
  prestigeRequire: 0; //声望要求
  @Prop()
  resurrection: boolean; //是否可复活
  @Prop()
  mapUnits: MapUnits[];
  @Prop()
  tiledMap: string;
  @Prop()
  tags: string[];
}
export interface MapUnits {
  t: number; //1.传送门 2.商贩 3.任务 4.技能学习 5.专业学习 6.npc 7.野怪 8.Boss 9.玩家
  x: number; //列
  y: number; //行
  Id: string; //类型ID
  n: string; //名字
}

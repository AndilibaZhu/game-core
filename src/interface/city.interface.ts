/*
 * @Author: Andy
 * @Date: 2022-08-04 17:14:24
 * @LastEditTime: 2022-08-18 22:31:09
 */
import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export interface MapUnits {
  t: number; //1.传送门 2.商贩 3.任务 4.技能学习 5.专业学习 6.npc 7.野怪 8.Boss 9.玩家
  x: number; //列
  y: number; //行
  Id: string; //类型ID
  n: string; //名字
}
export type CityDocument = City & Document;
@Schema()
export class City extends Document {
  @Prop({ default: [] })
  portal: string[]; // 传送门
  @Prop({ unique: true })
  cityName: string; // 城市名字
  @Prop({ default: false })
  isCity: boolean; // 是否是城市
  @Prop({ default: false })
  isCapital: boolean; // 是否是首都
  @Prop({ default: false })
  isRaid: boolean; // 是否是副本
  @Prop({ default: 0 })
  level: number; // 等级要求
  @Prop({ default: '' })
  dec: string; // 描述
  @Prop({ default: [] })
  monsters: string[]; // 怪物列表
  @Prop({ default: [] })
  NPCS: string[]; // NPC列表
  @Prop({ default: [] })
  Buff: string[]; // Buff列表
  @Prop({ default: '' })
  prestigeName: string; //声望名称
  @Prop({ default: 0 })
  prestigeRequire: number; //声望要求
  @Prop({ default: true })
  resurrection: boolean; //是否可复活
  @Prop({ default: [] })
  mapUnits: MapUnits[]; // 地图单位
  @Prop({ default: '' })
  tiledMap: string; // 瓦片地图名称
  @Prop({ default: [] })
  tags: string[]; // 标签
  @Prop() //地图
  mapSize: number; // 地图大小
  @Prop() //地图
  mapBackground: string; // 地图背景
}

export interface SearchOption {
  pageInfo: {
    pageNo: number;
    pageLimit: number;
  };
  searchData: {
    tags?: string;
    isCity?: string;
    isCapital?: boolean;
  };
}

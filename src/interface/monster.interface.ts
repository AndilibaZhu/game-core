/*
 * @Author: Andy
 * @Date: 2022-08-04 22:21:32
 * @LastEditTime: 2022-09-22 23:13:41
 */
import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { GoodsData } from './goodsInfo.interface';

export type MonsterDocument = Monster & Document;
@Schema()
export class Monster extends Document {
  @Prop({ unique: true })
  monsterName: string;
  @Prop()
  monsterType: number; //1.近战 2.远程 3.BOSS
  @Prop({ default: 1 })
  level: number; //等级
  @Prop()
  drop: Drop[]; //掉落
  @Prop()
  coin: number; //掉落金钱
  @Prop()
  exp: number; //掉落经验
  @Prop({ default: 1 })
  vit: number; //防御力
  @Prop({ default: 1 })
  atk: number; //攻击力
  @Prop({ default: 1 })
  hp: number; //生命值
  @Prop({ default: [] })
  freeTalk: string[]; //自由对话
  @Prop({ default: '' })
  icon: string; //图标
  @Prop({ default: 1 })
  atkDistance: number; //攻击距离
  @Prop({ default: '' })
  dec: string; //描述
  @Prop({ default: 0 })
  prestige: number; //声望值
  @Prop({ default: '' })
  prestigeName: string; //声望名称
}
interface Drop {
  goods: GoodsData[];
  rate: number;
}
export interface SearchOption {
  pageInfo: {
    pageNo: number;
    pageLimit: number;
  };
  searchInfo: {
    monsterName: string;
  };
}
export class MonsterUnit {
  t = 7; //1.传送门 2.商贩 3.任务 4.技能学习 5.专业学习 6.npc 7.野怪 8.Boss 9.玩家
  Id: string;
  moId: string;
  x: number;
  y: number;
  n: string;
  moT: number; //1.近战 2.远程 3.BOSS
  lv: number; //等级
  vit: number; //防御力
  atk: number; //攻击力
  hp: number; //生命值
  hpN: number;
  icon: string; //图标
  atkD: number; //攻击距离
  constructor(data: Monster, id: string, x: number, y: number) {
    this.Id = id;
    this.x = x;
    this.y = y;
    this.moId = data._id;
    this.n = data.monsterName;
    this.moT = data.monsterType;
    this.lv = data.level;
    this.vit = data.vit;
    this.atk = data.atk;
    this.hp = data.hp;
    this.hpN = data.hp;
    this.icon = data.icon;
    this.atkD = data.atkDistance;
  }
}

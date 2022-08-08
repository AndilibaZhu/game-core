/*
 * @Author: Andy
 * @Date: 2022-08-04 22:21:32
 * @LastEditTime: 2022-08-08 15:56:08
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
  dec: string; //描述
  @Prop({ default: 0 })
  prestige: number; //声望值
  @Prop({ default: '' })
  prestigeName: string; //声望名称
  constructor(monster: Monster) {
    super();
    this.monsterName = monster.monsterName;
    this.monsterType = monster.monsterType;
    this.level = monster.level;
    this.drop && (this.drop = monster.drop);
    this.coin = monster.coin;
    this.exp = monster.exp;
    this.vit = monster.vit;
    this.atk = monster.atk;
    this.hp = monster.hp;
    this.freeTalk && (this.freeTalk = monster.freeTalk);
    this.dec && (this.dec = monster.dec);
    this.prestige && (this.prestige = monster.prestige);
    this.prestigeName && (this.prestigeName = monster.prestigeName);
  }
}
interface Drop {
  goods: GoodsData[];
  rate: number;
}

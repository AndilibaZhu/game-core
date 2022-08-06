/*
 * @Author: Andy
 * @Date: 2022-08-04 22:21:32
 * @LastEditTime: 2022-08-05 13:32:08
 */
import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
  drop: [string]; //掉落装备
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
  freeTalk: string[];
  @Prop({ default: '' })
  dec: string;
}

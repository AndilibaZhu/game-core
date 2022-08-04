/*
 * @Author: Andy
 * @Date: 2022-07-28 14:35:02
 * @LastEditTime: 2022-07-29 22:56:21
 */
import { Prop, Schema } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export class BackPack {
  t: number; //1.血瓶2.蓝瓶3.金钱4.钻石5.经验值6.技能书7.装备箱8.物品箱9.礼包10.门票11.BUFF12.打造材料13打造祝福14炉石15.背包100装备
  n: string; //名称
  data: EquipsData | GoodsData; //数据
  l: boolean; //锁定
  _id: string; //id（背包内物品编号）
  Id: string; //id（物品类型ID）
  num: number; //数量
  constructor(type: number, data: EquipsData | GoodsData, num?: number) {
    if (type === 1) {
      this.t = data.type;
      this.n = data.n;
      this.data = data;
      this.l = false;
      this._id = new Types.ObjectId().toString();
      this.Id = data._id;
      this.num = num ? num : 1;
    } else {
      this.t = 100;
      this.n = data.n;
      this.data = data;
      this.l = false;
      this._id = new Types.ObjectId().toString();
      this.Id = data._id;
      this.num = 1;
    }
  }
}

export type GoodsDataDocument = GoodsData & Document;
@Schema()
export class GoodsData extends Document {
  @Prop({ unique: true })
  n: string; //名称
  @Prop()
  dec: string; //描述
  @Prop()
  type: number; //1.血瓶2.蓝瓶3.金钱4.钻石5.经验值6.技能书7.装备箱8.物品箱9.礼包10.门票11.BUFF12.打造材料13打造祝福14炉石15.背包
  @Prop()
  stackMax: number; //堆叠上限
  @Prop()
  ico: string; //图标
  @Prop()
  color: number; //品级
  @Prop()
  level: number; //等级
  @Prop()
  usage: string; //用途
  @Prop()
  value: number; //售价
}

export type EquipsDataDocument = EquipsData & Document;
@Schema()
export class EquipsData extends Document {
  @Prop({ unique: true })
  n: string;
  @Prop()
  ico: string;
  @Prop()
  dec: string;
  @Prop()
  j: number; //职业要求 1.战士2.弓箭手3。魔法师
  @Prop()
  type: number; //部位
  @Prop()
  level: number; //装备等级
  @Prop()
  color: number; //品质
  @Prop()
  handMade: boolean; //专业制造
  @Prop()
  value: number; //售价
  @Prop()
  str: number; //力量
  @Prop()
  dex: number; //敏捷
  @Prop()
  int: number; //智力
  @Prop()
  vit: number; //防御力
  @Prop()
  atk: number; //攻击力
  @Prop()
  hp: number; //生命值
  @Prop()
  mp: number; //魔法值
  @Prop()
  expSpeed: number; //经验加成
  @Prop()
  coinSpeed: number; //金钱加成
  @Prop()
  atkCrit: number; //攻击暴击
  @Prop()
  critDmg: number; //暴击伤害
  @Prop()
  penetrate: number; //穿透
  @Prop()
  atkSpeed: number; //出手速度
}

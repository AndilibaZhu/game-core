/*
 * @Author: Andy
 * @Date: 2022-07-28 13:48:38
 * @LastEditTime: 2022-08-08 21:24:57
 */
import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BackPack } from './goodsInfo.interface';
import { Pos } from './travel.interface';
export class PlayerInfo {
  str: number; //力量
  dex: number; //敏捷
  int: number; //智力
  vit: number; //防御
  hp: number; //生命值
  mp: number; //魔法值
  expSpeed: number; //经验加成
  coinSpeed: number; //金钱加成
  atkCrit: number; //攻击暴击率
  critDmg: number; //暴击伤害倍率
  atk: number; //攻击力
  pentrate: number; //穿透
  atkspeed: number; //出手速度
  playerPersonal: number[]; //玩家个人增加的属性 1.str 2.dex 3.int 4.vit 5.hp 6.mp
  constructor() {
    this.str = 5;
    this.dex = 5;
    this.int = 5;
    this.vit = 5;
    this.hp = 0;
    this.mp = 0;
    this.expSpeed = 100;
    this.coinSpeed = 100;
    this.atkCrit = 0;
    this.critDmg = 150;
    this.atk = 0;
    this.pentrate = 0;
    this.atkspeed = 0;
    this.playerPersonal = [0, 0, 0, 0, 0, 0]; //玩家个人增加的属性 1.str 2.dex 3.int 4.vit 5.hp 6.mp
  }
}
export type UserInfoDocument = UserInfo & Document;
@Schema()
export class UserInfo extends Document {
  @Prop({ unique: true })
  username: string;
  @Prop({ default: new PlayerInfo() })
  playerInfo: PlayerInfo;
  @Prop({ default: 0 })
  job: number; //1.战士 2.弓箭手 3.法师
  @Prop({ default: 5 })
  freeAbP: number; //自由能力点
  @Prop({ default: 10000 })
  hpStore: number; //生命值储备
  @Prop({ default: 10000 })
  mpStore: number; //魔法值储备
  @Prop({ default: [] })
  playerEquip: BackPack[]; //default: [null null null null null null null null null null null null null null] //玩家装备
  @Prop({ default: [] })
  backPackBag: BackPack[]; //default: [null null null null] //背包格子的背包
  @Prop({ default: { x: 0, y: 0, mapid: 'map1' } })
  pos: Pos; //default: {x: 0, y: 0, mapid: 'map1'} //玩家当前位置
  @Prop({ default: 1 })
  level: number; //default: 1 //玩家等级
  @Prop({ default: 1 })
  exp: number; //default: 0 //玩家经验
  //@Prop({ default: null })
  //group: { type: Object };
  @Prop({ default: 100 })
  gold: number; //金币
  @Prop({ default: 100 })
  diamond: number; //钻石
  @Prop({ default: 20 })
  backMax: number; //背包总容量
  @Prop({ default: [] })
  backPack: BackPack[]; //背包内物品
  @Prop({ default: [] })
  friendList: FriendList[]; //好友列表
  @Prop({ default: [] })
  prestigeList: PrestigeList[]; //声望列表
  @Prop({ default: [] })
  mailList: MailList[]; //邮件列表
}

interface PrestigeList {
  name: string;
  level: number;
  exp: number;
  maxExp: number;
}
interface MailList {
  title: string;
  content: string;
  time: number;
  goods: BackPack[];
  coins: number;
  exp: number;
}
interface FriendList {
  name: string;
  id: string;
}

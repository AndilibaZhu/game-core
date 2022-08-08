/*
 * @Author: Andy
 * @Date: 2022-08-07 17:26:32
 * @LastEditTime: 2022-08-08 14:35:04
 */
import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NPCDocument = NPC & Document;
@Schema()
export class NPC extends Document {
  @Prop({ unique: true })
  NPCName: string; //NPC名字
  @Prop()
  NPCType: number[]; // ['售卖' '杂货商' '任务' '技能学习' '专业学习' 'npc' '暂定']
  @Prop({ default: [] })
  sellDetail: string[]; // 出售物品详情
  @Prop({ default: [] })
  quest: string[]; // 任务详情
  @Prop({ default: [] })
  skill: string[]; //职业技能
  @Prop({ default: [] })
  professionSkills: string[]; //专业技能
  @Prop({ default: 0 })
  t: number;
  @Prop({ default: 0 })
  appearTimeS: number; //出现时间
  @Prop({ default: 24 })
  appearTimeE: number; //出现时间
  @Prop({ default: [] })
  freeTalk: string[]; //自由对话
  @Prop({ default: '' })
  dec: string; //描述
  @Prop({ default: '' })
  prestige: string; //声望名称
  @Prop()
  NPCLooks: string; // NPC贴图
}

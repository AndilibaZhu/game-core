/*
 * @Author: Andy
 * @Date: 2022-07-29 22:09:41
 * @LastEditTime: 2022-09-07 15:05:33
 */
import { SchemaFactory } from '@nestjs/mongoose';
import { UserInfo } from '../interface/userInfo.interface';
import { User } from '../interface/user.interface';
import { EquipsData, GoodsData } from '../interface/goodsInfo.interface';
import { City } from '../interface/city.interface';
import { Admin } from '../interface/adminInterface/admin.interface';
import { Chat } from '../interface/chat.interface';
import { Monster } from 'src/interface/monster.interface';
export const AdminSchema = SchemaFactory.createForClass(Admin);
export const UserSchema = SchemaFactory.createForClass(User);
export const UserInfoSchema = SchemaFactory.createForClass(UserInfo);
export const EquipsDataSchema = SchemaFactory.createForClass(EquipsData);
export const GoodsDataSchema = SchemaFactory.createForClass(GoodsData);
export const CitySchema = SchemaFactory.createForClass(City);
export const chatSchema = SchemaFactory.createForClass(Chat);
export const MonsterSchema = SchemaFactory.createForClass(Monster);

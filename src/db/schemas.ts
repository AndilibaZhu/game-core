/*
 * @Author: Andy
 * @Date: 2022-07-29 22:09:41
 * @LastEditTime: 2022-07-29 22:16:42
 */
import { SchemaFactory } from '@nestjs/mongoose';
import { UserInfo } from '../interface/userInfo.interface';
import { User } from '../interface/user.interface';
import { EquipsData, GoodsData } from '../interface/goodsInfo.interface';
export const UserSchema = SchemaFactory.createForClass(User);
export const UserInfoSchema = SchemaFactory.createForClass(UserInfo);
export const EquipsDataSchema = SchemaFactory.createForClass(EquipsData);
export const GoodsDataSchema = SchemaFactory.createForClass(GoodsData);

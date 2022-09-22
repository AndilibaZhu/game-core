/*
 * @Author: Andy
 * @Date: 2022-04-18 13:21:52
 * @LastEditTime: 2022-09-08 21:15:48
 */
import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfig } from '../../config';
import { AdminSchema, UserSchema, UserInfoSchema, GoodsDataSchema, EquipsDataSchema, CitySchema, chatSchema, MonsterSchema } from './schemas';

//整合所有的schema，并且把它们注册到mongoose中
const MONGO_MODELS = MongooseModule.forFeature([
  {
    name: 'ADMIN_MODEL',
    schema: AdminSchema,
    collection: 'admins',
  },
  {
    name: 'USER_MODEL',
    schema: UserSchema,
    collection: 'users',
  },
  {
    name: 'USERINFO_MODEL',
    schema: UserInfoSchema,
    collection: 'userinfos',
  },
  {
    name: 'GOODSDATA_MODEL',
    schema: GoodsDataSchema,
    collection: 'goodsdatas',
  },
  {
    name: 'EQUIPSDATA_MODEL',
    schema: EquipsDataSchema,
    collection: 'equipsdatas',
  },
  {
    name: 'CITY_MODEL',
    schema: CitySchema,
    collection: 'cities',
  },
  {
    name: 'CHAT_MODEL',
    schema: chatSchema,
    collection: 'chatmessages',
  },
  {
    name: 'MONSTER_MODEL',
    schema: MonsterSchema,
    collection: 'monsters',
  },
]);
@Global()
@Module({
  imports: [MongooseModule.forRoot(AppConfig.db.uri), MONGO_MODELS],
  exports: [MONGO_MODELS],
})
export class DbModule {}

/*
 * @Author: Andy
 * @Date: 2022-07-26 21:59:25
 * @LastEditTime: 2022-08-11 21:38:08
 */
import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop({ unique: true })
  readonly username: string;
  @Prop()
  readonly password: string;
  @Prop()
  userDataID: string;
  @Prop({ default: new Date().valueOf() })
  readonly createTime: number;
  @Prop()
  readonly lastLogin: number;
  @Prop()
  readonly salt: string;
  @Prop({ default: false })
  readonly isBaned: boolean;
  @Prop({ default: false })
  readonly isDeleted: boolean;
  @Prop({ default: '' })
  readonly IPAddress: string;
}
export interface LoginForm {
  username: string;
  password: string;
}
// 登陆成功，返回token
export interface LoginSuccess {
  token: string;
}
export interface SearchOption {
  pageInfo: {
    pageNo: number;
    pageLimit: number;
  };
  searchData: {
    username?: string;
    isDeleted?: string;
    isBaned?: boolean;
  };
}

/*
 * @Author: Andy
 * @Date: 2022-08-03 15:34:12
 * @LastEditTime: 2022-08-09 10:23:59
 */
import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AdminDocument = Admin & Document;

@Schema()
export class Admin extends Document {
  @Prop({ unique: true })
  readonly adminname: string;
  @Prop()
  readonly password: string;
  @Prop()
  readonly salt: string;
  @Prop()
  readonly lastLogin: number;
}
export interface Token {
  token: string;
}

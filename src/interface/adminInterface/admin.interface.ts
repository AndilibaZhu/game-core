/*
 * @Author: Andy
 * @Date: 2022-08-03 15:34:12
 * @LastEditTime: 2022-08-03 21:17:33
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AdminDocument = Admin & Document;

@Schema()
export class Admin extends Document {
  @Prop({ unique: true })
  readonly adminname: string;
  @Prop()
  readonly password: string;
  @Prop()
  readonly lastLogin: number;
}
export const AdminSchema = SchemaFactory.createForClass(Admin);
export interface Token {
  token: string;
}

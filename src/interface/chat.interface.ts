/*
 * @Author: Andy
 * @Date: 2022-08-20 20:06:17
 * @LastEditTime: 2022-08-22 23:33:32
 */
import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export interface ChatMessage {
  fr: string;
  t: string;
  to: string;
  co: string;
}

export type ChatDocument = Chat & Document;
@Schema()
export class Chat extends Document {
  @Prop()
  from: string;
  @Prop()
  to: string;
  @Prop()
  t: string;
  @Prop()
  content: string;
}

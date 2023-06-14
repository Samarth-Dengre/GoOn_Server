import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';
import { Product } from './product.schema';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop({ required: true })
  total: string;

  @Prop({ required: true })
  orderStatus: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  orderUser: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  orderProducts: Product[];

  @Prop({ required: true })
  modeOfPayment: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

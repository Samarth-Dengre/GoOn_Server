import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Order } from './orders.schema';
import { Product } from './product.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  userName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false })
  userAddress: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order' })
  userOrders: Order[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  userCartProducts: Product[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

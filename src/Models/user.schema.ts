import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Order } from './order.schema';
import { Product } from './product.schema';
import { Store } from './store.schema';

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

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    default: [],
  })
  userOrders: Order[];

  @Prop([
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      seller: {
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        sellerName: { type: String, required: true },
      },
    },
  ])
  userCartProducts: {
    product: Product;
    seller: { id: Store; quantity: number; price: number; sellerName: string };
  }[];

  @Prop([
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      rating: { type: Number, required: true },
    },
  ])
  userRatings: { product: Product; rating: number }[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

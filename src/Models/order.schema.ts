import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';
import { Product } from './product.schema';
import { Store } from './store.schema';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop({ required: true })
  total: string;

  @Prop({ required: true })
  orderStatus: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  orderUser: User;

  @Prop([
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' },
      quantity: Number,
      price: Number,
    },
  ])
  orderItems: {
    product: Product;
    store: Store;
    quantity: number;
    price: number;
  }[];

  @Prop({ required: true })
  modeOfPayment: string;

  @Prop({
    type: {
      address: String,
      city: String,
      state: String,
      pincode: String,
    },
    required: true,
  })
  deliveryAddress: {
    address: string;
    city: string;
    state: string;
    pincode: string;
  };

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

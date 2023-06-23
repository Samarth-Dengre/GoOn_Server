import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Store } from './store.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({ required: true })
  productName: string;

  @Prop({ required: true })
  productDescription: string[];

  @Prop({ required: true })
  productMRP: number;

  @Prop({ required: true })
  productImage: string[];

  @Prop([
    {
      store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' },
      price: { type: Number, required: true },
    },
  ])
  productStores: { store: Store; price: number }[];

  @Prop({
    type: { rating: Number, numReviews: Number },
    default: { rating: 0, numReviews: 0 },
  })
  productrating: {
    rating: number;
    numReviews: number;
  };

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

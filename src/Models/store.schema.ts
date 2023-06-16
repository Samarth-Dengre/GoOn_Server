import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Category } from './category.schema';
import { Product } from './product.schema';

export type StoreDocument = HydratedDocument<Store>;

@Schema()
export class Store {
  @Prop({ required: true })
  storeName: string;

  @Prop({ required: true })
  storeImage: string;

  @Prop({ required: true })
  storeAddress: string;

  @Prop({ required: true })
  storeContact: string;

  @Prop({ required: true })
  storeEmail: string;

  @Prop({ required: true })
  storeDescription: string[];

  @Prop({ required: true, default: false })
  isVerified: boolean;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }] })
  storeCategory: Category[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
  storeProducts: Product[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const StoreSchema = SchemaFactory.createForClass(Store);

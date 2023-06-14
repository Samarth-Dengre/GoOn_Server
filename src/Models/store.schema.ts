import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Category } from './category.schema';

export type StoreDocument = HydratedDocument<Store>;

@Schema()
export class Store {
  @Prop({ required: true })
  storeName: string;

  @Prop({ required: true })
  storeAddress: string;

  @Prop({ required: true })
  storeContact: string;

  @Prop({ required: true })
  storeEmail: string;

  @Prop({ required: true, default: false })
  isVerified: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  storeCategory: Category[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const StoreSchema = SchemaFactory.createForClass(Store);

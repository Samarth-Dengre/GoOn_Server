import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Store } from './store.schema';

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category {
  @Prop({ required: true })
  categoryName: string;

  @Prop({ required: true })
  categoryDescription: string;

  @Prop({ required: true })
  categoryImage: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Store' })
  categoryStore: Store[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

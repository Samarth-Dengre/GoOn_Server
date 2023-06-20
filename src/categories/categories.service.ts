import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/Models/category.schema';
import { Response } from 'express';
@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  async getStoresByCategory(category: string, res: Response) {
    try {
      const categoryObj = await this.categoryModel
        .findOne({
          categoryId: category,
        })
        .populate(
          'categoryStore',
          'storeName storeAddress storeContact storeEmail isVerified storeImage storerating',
        );
      return res.status(200).json({
        categoryStores: categoryObj.categoryStore,
        message: 'Stores fetched successfully',
      });
    } catch (err) {
      return res.status(400).json({
        message: 'Internal Server Error',
      });
    }
  }
}

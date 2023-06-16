import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/Models/category.schema';
import { categories } from 'seeds/category';
import { Store } from 'src/Models/store.schema';
import { Response } from 'express';
@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
    @InjectModel('Store') private readonly storeModel: Model<Store>,
  ) {}

  async getStoresByCategory(category: string, res: Response) {
    try {
      const categoryObj = await this.categoryModel
        .findOne({
          categoryId: category,
        })
        .populate(
          'categoryStore',
          'storeName storeAddress storeContact storeEmail isVerified storeImage',
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

  //   This function is used to seed the database with the categories data.
  async seedCategories() {
    await this.categoryModel.deleteMany({});
    await this.categoryModel.insertMany(categories);
    return 'seeded';
  }
}

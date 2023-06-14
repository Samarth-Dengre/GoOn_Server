import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/Models/category.schema';
import { categories } from 'seeds/category';
@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  //   This function is used to seed the database with the categories data.
  async seedCategories() {
    await this.categoryModel.deleteMany({});
    await this.categoryModel.insertMany(categories);
    return 'seeded';
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Store } from 'src/Models/store.schema';
import { Category } from 'src/Models/category.schema';
import { stores } from 'seeds/stores';
import { Product } from 'src/Models/product.schema';

@Injectable()
export class StoresService {
  constructor(
    @InjectModel('Store') private readonly storeModel: Model<Store>,
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  //  This function is used to get all the stores.
  async getAllStores() {
    return await this.storeModel
      .find()
      .populate('storeCategory', 'categoryName')
      .select(
        'storeName storeAddress storeContact storeEmail isVerified storeCategory storeImage',
      );
  }

  //   This function is used to seed the database with the stores data.
  async seedStores() {
    await this.storeModel.deleteMany({});
    for (let i = 0; i < stores.length; i++) {
      const store = stores[i];
      const createdStore = await this.storeModel.create({
        storeName: store.storeName,
        storeAddress: store.storeAddress,
        storeContact: store.storeContact,
        storeEmail: store.storeEmail,
        isVerified: store.isVerified,
        storeDescription: store.storeDescription,
        storeImage: store.storeImage,
        storeCategory: [],
        storeProducts: [],
      });

      for (let j = 0; j < store.storeCategory.length; j++) {
        const category = await this.categoryModel.findOne({
          categoryId: store.storeCategory[j],
        });
        createdStore.storeCategory.push(category);
        category.categoryStore.push(createdStore);
        await category.save();
      }
      for (let j = 0; j < store.storeProducts.length; j++) {
        const pro = await this.productModel.findOne({
          _id: store.storeProducts[j],
        });
        createdStore.storeProducts.push(pro);
        pro.productStore = createdStore;
        await pro.save();
      }
      await createdStore.save();
    }
    return 'seeded';
  }
}

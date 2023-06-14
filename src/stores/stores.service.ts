import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Store } from 'src/Models/store.schema';
import { Category } from 'src/Models/category.schema';
import { stores } from 'seeds/stores';

@Injectable()
export class StoresService {
  constructor(
    @InjectModel('Store') private readonly storeModel: Model<Store>,
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

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
        storeProducts: store.storeProducts,
      });

      for (let j = 0; j < store.storeCategory.length; j++) {
        const category = await this.categoryModel.findOne({
          categoryId: store.storeCategory[j],
        });
        createdStore.storeCategory.push(category);
        await createdStore.save();
      }
    }
    return 'seeded';
  }
}

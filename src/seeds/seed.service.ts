import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/Models/product.schema';
import { Store } from 'src/Models/store.schema';
import { stores } from 'seeds/stores';
import { products } from 'seeds/products';
import { Category } from 'src/Models/category.schema';
import { categories } from 'seeds/category';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
    @InjectModel('Store') private readonly storeModel: Model<Store>,
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  //   This function is used to seed the database with the data.
  async seedDatabse() {
    await this.productModel.deleteMany({});
    await this.categoryModel.deleteMany({});
    await this.storeModel.deleteMany({});
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const createdProduct = await this.productModel.create({
        productName: product.productName,
        productDescription: product.productDescription,
        productPrice: product.productPrice,
        productImage: product.productImage,
        productrating: product.productrating,
        productMRP: product.productMRP,
      });
      await createdProduct.save();
    }
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      const createdCategory = await this.categoryModel.create({
        categoryId: category.categoryId,
        categoryName: category.categoryName,
      });
      await createdCategory.save();
    }

    for (let i = 0; i < stores.length; i++) {
      const store = stores[i];
      const createdStore = await this.storeModel.create({
        storeName: store.storeName,
        storeDescription: store.storeDescription,
        storeImage: store.storeImage,
        storeEmail: store.storeEmail,
        storeContact: store.storeContact,
        storeAddress: store.storeAddress,
        storerating: store.storerating,
        isVerified: store.isVerified,
      });
      for (let j = 0; j < store.storeCategory.length; j++) {
        const category = store.storeCategory[j];
        const categoryFound = await this.categoryModel.findOne({
          categoryId: category,
        });
        createdStore.storeCategory.push(categoryFound);
        categoryFound.categoryStore.push(createdStore);
        await categoryFound.save();
      }

      const allProducts = await this.productModel.find({});
      for (let j = 0; j < store.storeProducts.length; j++) {
        const product = store.storeProducts[j];
        createdStore.storeProducts.push(allProducts[product]);
        const productFound = await this.productModel.findOne({
          _id: allProducts[product]._id,
        });
        productFound.productStore.push(createdStore);
        await productFound.save();
      }
      await createdStore.save();
    }

    return 'seeded';
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/Models/product.schema';
import { Store } from 'src/Models/store.schema';
import { products } from 'seeds/products';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
    @InjectModel('Store') private readonly storeModel: Model<Store>,
  ) {}

  //   This function is used to seed the database with the products data.
  async seedProducts() {
    await this.productModel.deleteMany({});
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const createdProduct = await this.productModel.create({
        productName: product.productName,
        productDescription: product.productDescription,
        productPrice: product.productPrice,
        productImage: product.productImage,
      });
      await createdProduct.save();
    }
    return 'seeded';
  }
}

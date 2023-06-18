import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/Models/product.schema';
import { Response } from 'express';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  // This function is used to get a product by its id.
  async getProductById(id: string, res: Response) {
    try {
      const product = await this.productModel.findById(id);
      if (!product) {
        return res.status(404).json({ msg: ['Product not found'] });
      }
      product.__v = undefined;
      product.createdAt = undefined;
      product.updatedAt = undefined;
      return res.status(200).json(product);
    } catch (err) {
      return res.status(500).json({ msg: ['Server error'] });
    }
  }
}

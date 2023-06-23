import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/Models/product.schema';
import { Response } from 'express';
import { User } from 'src/Models/user.schema';
import { Rate_Product_Dto } from './dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  // This function is used to get a product by its id.
  async getProductById(id: string, storeId: string, res: Response) {
    try {
      // select the productStores where the store id matches the store id passed in the query
      const product = await this.productModel
        .findById(id)
        .select({
          productName: 1,
          productDescription: 1,
          productImage: 1,
          productrating: 1,
          productMRP: 1,
          productStores: {
            $elemMatch: { store: storeId },
          },
        })
        .populate('productStores.store', 'storeName ');

      if (!product) {
        return res.status(404).json({ msg: ['Product not found'] });
      }

      product.__v = undefined;
      product.createdAt = undefined;
      product.updatedAt = undefined;
      return res.status(200).json(product);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: ['Server error'] });
    }
  }

  // This function is used to rate a product
  async rateProduct(dto: Rate_Product_Dto, res: Response, user: any) {
    try {
      const product = await this.productModel.findById(dto.product_id);
      if (!product) {
        return res.status(404).json({ msg: ['Product not found'] });
      }

      // Check if the user has already rated the product
      const hasRated = user.userRatings.filter(
        (rating) => rating.product.toString() === dto.product_id,
      );
      if (hasRated.length > 0) {
        // If the user has already rated the product, then update the rating
        const rating = product.productrating.rating;
        const numberOfRatings = product.productrating.numReviews;
        const newRating =
          (rating * numberOfRatings - hasRated[0].rating + dto.rating) /
          numberOfRatings;
        product.productrating.rating = newRating;
        await product.save();

        // Update the rating in the user
        user.userRatings = user.userRatings.map((rating) => {
          if (rating.product.toString() === dto.product_id) {
            rating.rating = dto.rating;
          }
          return rating;
        });
        await user.save();
        return res.status(200).json({ msg: ['Product rated successfully'] });
      } else {
        // If the user has not rated the product, then add the rating to the product
        const rating = product.productrating.rating;
        const numberOfRatings = product.productrating.numReviews;
        const newRating =
          (rating * numberOfRatings + dto.rating) / (numberOfRatings + 1);
        product.productrating.rating = newRating;
        product.productrating.numReviews = numberOfRatings + 1;
        await product.save();

        // Add the rating to the user
        user.userRatings.push({
          product: product,
          rating: dto.rating,
        });
        await user.save();
        return res.status(200).json({ msg: ['Product rated successfully'] });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: ['Server error'] });
    }
  }
}

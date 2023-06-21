import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/Models/user.schema';
import { Cart_Item_Dto } from './dto';
import { Response } from 'express';
import { Product } from 'src/Models/product.schema';
import { Store } from 'src/Models/store.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Store.name) private storeModel: Model<Store>,
  ) {}

  // This method handles the cart management logic for the user (add/remove items from cart)
  async manageCart(dto: Cart_Item_Dto, res: Response, user: any) {
    try {
      const userObj = await this.userModel.findById(user._id);
      const productObj = await this.productModel.findById(dto.product);
      if (!productObj) {
        return res.status(400).json({
          message: ['Product not found'],
        });
      }
      const seller = await this.storeModel.findById(dto.seller);
      if (!seller) {
        return res.status(400).json({
          message: ['Seller not found'],
        });
      }
      // check if the product is sold by the seller
      const isSoldBySeller = productObj.productStore.some(
        (item) => item.toString() === seller._id.toString(),
      );
      if (!isSoldBySeller) {
        return res.status(400).json({
          message: ['Product is not sold by the seller'],
        });
      }

      // fetch the price of the product from the seller
      const price = seller.storeProducts.find(
        (item) => item.product.toString() === dto.product.toString(),
      ).price;

      const cartItems = userObj.userCartProducts;

      // check if the product is already in the cart or not
      const index = cartItems.findIndex(
        (item) =>
          item.product.toString() === dto.product.toString() &&
          item.seller.toString() === dto.seller.toString(),
      );

      // if the product is not in the cart, add it to the cart
      if (index === -1) {
        cartItems.push({
          product: productObj,
          seller: {
            id: seller,
            quantity: dto.quantity,
            price: price,
            sellerName: seller.storeName,
          },
        });
      } else {
        cartItems[index].seller.quantity += dto.quantity;
      }
      userObj.userCartProducts = cartItems;
      await userObj.save();
      return res.status(200).json({
        message: ['Cart updated successfully!'],
      });
    } catch (err) {
      console.log('err in user.service.ts manageCart()', err);
      return res.status(500).json({ message: ['Something went wrong'] });
    }
  }

  // This method handles the cart retrieval logic for the user (get cart)
  async getCart(res: Response, user: any) {
    try {
      const cartItems = await this.userModel.findById(user._id).populate({
        path: 'userCartProducts.product',
        select: 'productName productImage productMRP',
      });

      return res.status(200).json({
        message: ['Cart retrieved successfully!'],
        cartItems: cartItems.userCartProducts,
      });
    } catch (err) {
      console.log('err in user.service.ts getCart()', err);
      return res.status(500).json({ message: ['Something went wrong'] });
    }
  }
}

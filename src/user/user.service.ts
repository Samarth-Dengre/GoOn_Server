import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/Models/user.schema';
import { Cart_Item_Dto } from './dto';
import { Response } from 'express';
import { Product } from 'src/Models/product.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  // This method handles the cart management logic for the user (add/remove items from cart)
  async manageCart(dto: Cart_Item_Dto, res: Response, user: any) {
    try {
      const userObj = await this.userModel.findById(user._id);
      const productObj = await this.productModel.findById(dto.product);
      const cartItems = userObj.userCartProducts;
      const index = cartItems.findIndex(
        (item) => item.product.toString() === dto.product.toString(),
      );
      if (index === -1) {
        if (dto.quantity < 0) {
          return res.status(400).json({
            message: ['Invalid quantity'],
          });
        }
        cartItems.push({
          product: productObj,
          quantity: dto.quantity,
        });
      } else {
        if (cartItems[index].quantity + dto.quantity < 0) {
          return res.status(400).json({
            message: ['Invalid quantity'],
          });
        }
        cartItems[index].quantity += dto.quantity;
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

  // This method handles the cart retrieval logic for the user
  async getCart(res: Response, user: any) {
    try {
      const userObj = await this.userModel
        .findById(user._id)
        .populate(
          'userCartProducts.product',
          'productName productPrice productImage productMRP ',
        );
      const cartItems = userObj.userCartProducts;
      return res.status(200).json({
        message: ['Cart retrieved successfully!'],
        cartItems,
      });
    } catch (err) {
      console.log('err in user.service.ts getCart()', err);
      return res.status(500).json({ message: ['Something went wrong'] });
    }
  }
}

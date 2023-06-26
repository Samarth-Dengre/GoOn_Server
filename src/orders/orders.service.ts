import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'src/Models/order.schema';
import { Product } from 'src/Models/product.schema';
import { Store } from 'src/Models/store.schema';
import { OrderDto } from './dto';
import { Response } from 'express';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Store.name) private storeModel: Model<Store>,
  ) {}

  // This method handles the order placement logic for the user
  async createOrder(dto: OrderDto, res: Response, user: any) {
    try {
      const { modeOfPayment, deliveryAddress } = dto;
      const userCart = user.userCartProducts;
      if (userCart.length === 0) {
        return res.status(400).json({ msg: ['Cart is empty'] });
      }
      const total = userCart.reduce((acc: number, curr) => {
        return acc + curr.seller.price * curr.seller.quantity;
      }, 0);
      const orderItems = userCart.map((item) => {
        return {
          product: item.product,
          quantity: item.seller.quantity,
          store: item.seller.id,
          price: item.seller.price,
        };
      });
      const order = await this.orderModel.create({
        orderUser: user._id,
        orderItems,
        total,
        modeOfPayment,
        deliveryAddress,
        orderStatus: 'PLACED',
      });
      user.userOrders.push(order._id);
      user.userCartProducts = [];
      await user.save();
      return res.status(201).json({ msg: ['Order placed successfully'] });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: ['Server error'] });
    }
  }

  // This method fetches all the orders placed by the user
  async getOrders(res: Response, user: any) {
    try {
      const orders = await this.orderModel
        .find({ orderUser: user })
        .populate({
          path: 'orderItems',
          populate: {
            path: 'product',
            select: {
              productName: 1,
            },
          },
        })
        .populate({
          path: 'orderItems',
          populate: {
            path: 'store',
            select: {
              storeName: 1,
            },
          },
        })
        .select({
          _id: 1,
          total: 1,
          orderStatus: 1,
          orderItems: 1,
          createdAt: 1,
        });
      return res.status(200).json({ orders });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: ['Server error'] });
    }
  }

  // This method fetches the order details of a particular order placed by the user by the order id
  async getOrderById(res: Response, user: any, orderId: string) {
    try {
      const order = await this.orderModel
        .findById(orderId)
        .populate({
          path: 'orderItems',
          populate: {
            path: 'product',
            select: {
              productName: 1,
              productImage: 1,
              productMRP: 1,
            },
          },
        })
        .populate({
          path: 'orderItems',
          populate: {
            path: 'store',
            select: {
              storeName: 1,
            },
          },
        })
        .select({
          _id: 1,
          total: 1,
          orderUser: 1,
          orderStatus: 1,
          orderItems: 1,
          deliveryAddress: 1,
          modeOfPayment: 1,
          createdAt: 1,
        });
      if (!order || order.orderUser.toString() !== user._id.toString()) {
        return res.status(400).json({ msg: ['Invalid order id'] });
      }
      order.orderUser = undefined;
      return res.status(200).json({ order });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: ['Server error'] });
    }
  }
}

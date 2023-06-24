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
      const products = [];
      const stores = [];
      for (let i = 0; i < dto.orderItems.length; i++) {
        const product = await this.productModel
          .findById(dto.orderItems[i].product)
          .select({
            _id: 1,
            productStores: {
              $elemMatch: { store: dto.orderItems[i].store },
            },
            productName: 0,
            productDescription: 0,
            productMRP: 0,
            productImage: 0,
            productrating: 0,
            createdAt: 0,
            updatedAt: 0,
          });
        const store = await this.storeModel
          .findById(dto.orderItems[i].store)
          .select({
            _id: 1,
            storeName: 0,
            storeAddress: 0,
            storeImage: 0,
            storeRating: 0,
            createdAt: 0,
            updatedAt: 0,
            storeDescription: 0,
            storeProducts: 0,
          });
        if (!product || !store) {
          return res.status(400).json({ msg: ['Invalid product or store'] });
        }
        products.push(product);
        stores.push(store);
      }
      const orders = [];
      let total = 0;
      for (let i = 0; i < products.length; i++) {
        if (
          !products[i].productStores ||
          products[i].productStores.length === 0
        ) {
          return res
            .status(400)
            .json({ msg: ['The product does is not sold by this store'] });
        }

        orders.push({
          product: products[i],
          store: stores[i],
          quantity: dto.orderItems[i].quantity,
          price: products[i].productStores[0].price,
        });
        total +=
          products[i].productStores[0].price * dto.orderItems[i].quantity;
      }

      const order = new this.orderModel({
        total,
        orderStatus: 'pending',
        orderUser: user,
        orderItems: orders,
        modeOfPayment: dto.modeOfPayment,
        deliveryAddress: dto.deliveryAddress,
      });
      await order.save();

      user.userOrders.push(order);
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

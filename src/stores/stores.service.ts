import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Store } from 'src/Models/store.schema';
import { Response } from 'express';

@Injectable()
export class StoresService {
  constructor(
    @InjectModel('Store') private readonly storeModel: Model<Store>,
  ) {}

  //  This function is used to get all the stores.
  async getAllStores() {
    return await this.storeModel
      .find()
      .populate('storeCategory', 'categoryName')
      .select(
        'storeName storeAddress storeContact storeEmail isVerified storeCategory storeImage storerating',
      );
  }

  //  This function is used to get a store by its id.
  async getStoreById(id: string, res: Response) {
    try {
      const store = await this.storeModel
        .findById(id)
        .populate('storeCategory', 'categoryName')
        .populate(
          'storeProducts',
          'productName productPrice productImage productrating productStore',
        );

      if (store) {
        return res.status(200).json({
          message: ['Store fetched successfully!'],
          store: store,
        });
      }
      return res.status(404).json({
        message: ['Store not found!'],
      });
    } catch (err) {
      console.log('err in stores.service.ts getStoreById()', err);
      return res.status(500).json({ message: ['Something went wrong'] });
    }
  }
}

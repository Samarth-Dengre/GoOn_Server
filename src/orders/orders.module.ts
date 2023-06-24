import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order, OrderSchema } from 'src/Models/order.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/Models/product.schema';
import { Store, StoreSchema } from 'src/Models/store.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: Store.name, schema: StoreSchema }]),
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}

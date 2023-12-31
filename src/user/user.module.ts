import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from 'src/Models/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/Models/product.schema';
import { Store, StoreSchema } from 'src/Models/store.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: Store.name, schema: StoreSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

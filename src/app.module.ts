import { Module } from '@nestjs/common';
import { StoresModule } from './stores/stores.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
// import { SeedModule } from './seeds/seed.module';

@Module({
  imports: [
    StoresModule,
    CategoriesModule,
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      'mongodb+srv://dengresamarth113:UzCYILEOOIbBlxUA@cluster0.16ixmkw.mongodb.net/GoOn',
    ),
    ProductsModule,
    OrdersModule,
    // SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

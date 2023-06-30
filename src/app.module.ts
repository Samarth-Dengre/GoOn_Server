import { Module } from '@nestjs/common';
import { StoresModule } from './stores/stores.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { CacheModule } from '@nestjs/cache-manager';
// import { SeedModule } from './seeds/seed.module';
import 'dotenv/config';
@Module({
  imports: [
    StoresModule,
    CategoriesModule,
    AuthModule,
    UserModule,
    ProductsModule,
    OrdersModule,
    // SeedModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    CacheModule.register({
      ttl: 1800000,
      max: 100, // maximum number of items in cache
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

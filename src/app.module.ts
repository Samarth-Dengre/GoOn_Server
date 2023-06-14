import { Module } from '@nestjs/common';
import { StoresModule } from './stores/stores.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

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
  ],
})
export class AppModule {}

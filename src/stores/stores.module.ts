import { Module } from '@nestjs/common';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Store, StoreSchema } from 'src/Models/store.schema';
import { Category, CategorySchema } from 'src/Models/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Store.name, schema: StoreSchema }]),
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [StoresController],
  providers: [StoresService],
})
export class StoresModule {}

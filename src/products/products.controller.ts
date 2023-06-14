import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  //   This function is used to seed the database with the products data.
  @Get('seed')
  async seedProducts() {
    return this.productsService.seedProducts();
  }
}

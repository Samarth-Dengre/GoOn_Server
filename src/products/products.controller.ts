import { Controller, Get, Param, Res } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Response } from 'express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get(':id')
  async getProductById(@Param('id') id: string, @Res() res: Response) {
    return this.productsService.getProductById(id, res);
  }
}

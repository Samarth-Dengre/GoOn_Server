import {
  Body,
  Controller,
  Get,
  Param,
  Query,
  Res,
  UseGuards,
  Req,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Response, Request } from 'express';
import { JwtGuard } from 'src/auth/guard';
import { Rate_Product_Dto } from './dto';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // This is the route for getting the products by id
  @UseInterceptors(CacheInterceptor)
  @Get(':id')
  async getProductById(
    @Param('id') id: string,
    @Query('store_id') storeId: string,
    @Res() res: Response,
  ) {
    return this.productsService.getProductById(id, storeId, res);
  }

  // This routes is for rating the product
  @UseGuards(JwtGuard)
  @Post('rate')
  async rateProduct(
    @Body() dto: Rate_Product_Dto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    return await this.productsService.rateProduct(dto, res, req.user);
  }
}

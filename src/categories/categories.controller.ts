import { Controller, Get, Query, Res, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { CategoriesService } from './categories.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // This function is used to get all stores of a specific category. The reques url is: http://localhost:5000/categories/?category=category_name
  @Get()
  @UseInterceptors(CacheInterceptor)
  async getStoresByCategory(
    @Query('category') category: string,
    @Res() res: Response,
  ) {
    return this.categoriesService.getStoresByCategory(category, res);
  }
}

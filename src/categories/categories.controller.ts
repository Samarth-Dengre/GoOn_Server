import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // This function is used to get all stores of a specific category. The reques url is: http://localhost:5000/categories/?category=category_name
  @Get()
  async getStoresByCategory(
    @Query('category') category: string,
    @Res() res: Response,
  ) {
    return this.categoriesService.getStoresByCategory(category, res);
  }

  //   This function is used to seed the database with the categories data.
  @Get('seed')
  async seedCategories() {
    return this.categoriesService.seedCategories();
  }
}

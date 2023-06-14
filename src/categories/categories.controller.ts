import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  //   This function is used to seed the database with the categories data.
  @Get('seed')
  async seedCategories() {
    return this.categoriesService.seedCategories();
  }
}

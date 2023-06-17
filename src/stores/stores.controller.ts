import { Controller, Get, Param, Res } from '@nestjs/common';
import { StoresService } from './stores.service';
import { Response } from 'express';
@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  // This function is used to get a store by its id.
  @Get(':id')
  async getStoreById(@Param('id') id: string, @Res() res: Response) {
    return this.storesService.getStoreById(id, res);
  }

  // This function is used to get all the stores.
  @Get()
  async getAllStores() {
    return this.storesService.getAllStores();
  }

  //   This function is used to seed the database with the stores data.
  @Get('seed')
  async seedStores() {
    return this.storesService.seedStores();
  }
}

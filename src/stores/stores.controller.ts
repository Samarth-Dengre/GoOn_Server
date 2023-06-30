import { Controller, Get, UseInterceptors, Param, Res } from '@nestjs/common';
import { StoresService } from './stores.service';
import { Response } from 'express';
import { CacheInterceptor } from '@nestjs/cache-manager';
@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  // This function is used to get a store by its id.
  @UseInterceptors(CacheInterceptor)
  @Get(':id')
  async getStoreById(@Param('id') id: string, @Res() res: Response) {
    return this.storesService.getStoreById(id, res);
  }

  // This function is used to get all the stores.
  @UseInterceptors(CacheInterceptor)
  @Get()
  async getAllStores() {
    return this.storesService.getAllStores();
  }
}

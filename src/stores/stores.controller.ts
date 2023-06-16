import { Controller, Get, UseGuards } from '@nestjs/common';
import { StoresService } from './stores.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

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

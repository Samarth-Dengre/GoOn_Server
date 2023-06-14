import { Controller, Get } from '@nestjs/common';
import { StoresService } from './stores.service';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  //   This function is used to seed the database with the stores data.
  @Get('seed')
  async seedStores() {
    return this.storesService.seedStores();
  }
}

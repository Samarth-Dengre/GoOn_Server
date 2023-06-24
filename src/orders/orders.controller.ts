import {
  Controller,
  Post,
  Res,
  Req,
  UseGuards,
  Body,
  Get,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { OrdersService } from './orders.service';
import { Request, Response } from 'express';
import { OrderDto } from './dto';

@Controller('orders')
@UseGuards(JwtGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // This method handles the order placement logic for the user
  @Post()
  async createOrder(
    @Res() res: Response,
    @Req() req: Request,
    @Body() dto: OrderDto,
  ) {
    return await this.ordersService.createOrder(dto, res, req.user);
  }

  // This method fetches all the orders placed by the user
  @Get()
  async getOrders(@Res() res: Response, @Req() req: Request) {
    return await this.ordersService.getOrders(res, req.user);
  }

  // This method fetches the order details of a particular order placed by the user using the order id
  @Get('/:id')
  async getOrder(@Res() res: Response, @Req() req: Request) {
    return await this.ordersService.getOrderById(res, req.user, req.params.id);
  }
}

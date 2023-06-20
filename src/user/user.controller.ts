import {
  Controller,
  Post,
  Body,
  UseGuards,
  Res,
  Req,
  Get,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Response, Request } from 'express';
import { JwtGuard } from 'src/auth/guard';
import { Cart_Item_Dto } from './dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard)
  @Post('cart')
  async manageCart(
    @Body() dto: Cart_Item_Dto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    return await this.userService.manageCart(dto, res, req.user);
  }

  @UseGuards(JwtGuard)
  @Get('cart')
  async getCart(@Res() res: Response, @Req() req: Request) {
    return await this.userService.getCart(res, req.user);
  }
}

import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login_Dto, Signup_Dto } from './dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: Signup_Dto, @Res() res: Response) {
    return this.authService.signup(dto, res);
  }

  @Post('login')
  async login(@Body() dto: Login_Dto, @Res() res: Response) {
    return this.authService.login(dto, res);
  }
}

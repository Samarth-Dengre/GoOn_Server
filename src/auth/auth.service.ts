import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { Login_Dto, Signup_Dto } from './dto';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/Models/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  // This method handles the signup logic
  async signup(
    { email, password, userName, confirmPassword }: Signup_Dto,
    res: Response,
  ) {
    try {
      if (password !== confirmPassword) {
        return res
          .status(400)
          .json({ message: ['Password and confirm password do not match'] });
      }
      const hashedPassword = await argon.hash(password);
      const user = await this.userModel.create({
        email,
        password: hashedPassword,
        userName,
      });
      return res.status(201).json({
        message: ['Signed up successfully'],
      });
    } catch (err) {
      console.log('err in auth.service.ts signup()', err);
      if (err.code === 'P2002') {
        return res.status(400).json({ message: ['Email already exists'] });
      }
      return res.status(500).json({ message: ['Something went wrong'] });
    }
  }

  // This method handles the login logic
  async login({ email, password }: Login_Dto, res: Response) {
    try {
      const user = await this.userModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: ['Invalid credentials'] });
      }
      const isPasswordValid = await argon.verify(user.password, password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: ['Invalid credentials'] });
      }
      user.password = undefined;
      user.createdAt = undefined;
      user.updatedAt = undefined;
      user.userOrders = undefined;
      // sum of all the quantities of all the products in the cart
      const cartSize = user.userCartProducts.reduce(
        (acc, item) =>
          acc + item.seller.reduce((acc, item) => acc + item.quantity, 0),
        0,
      );

      user.userCartProducts = undefined;
      const token = await this.createToken(user.id, user.email, Math.random());
      return res.status(200).json({
        message: ['Logged in successfully'],
        user,
        token,
        cartSize,
      });
    } catch (err) {
      console.log('err in auth.service.ts login()', err);
      return res.status(500).json({ message: ['Something went wrong'] });
    }
  }

  // This function creates a JWT token
  async createToken(
    userId: string,
    email: string,
    random: number,
  ): Promise<string> {
    const payload = {
      sub: userId,
      email,
      random,
    };
    const token = await this.jwt.sign(payload, {
      expiresIn: '15d',
      secret: this.config.get('JWT_SECRET'),
    });
    return token;
  }
}

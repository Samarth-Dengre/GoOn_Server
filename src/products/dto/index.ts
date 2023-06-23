import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class Rate_Product_Dto {
  @IsString()
  @IsNotEmpty()
  product_id: string;

  @IsNotEmpty()
  @IsNumber()
  rating: number;
}

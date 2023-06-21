import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class Cart_Item_Dto {
  @IsString()
  @IsNotEmpty()
  product: string;

  @IsNumber()
  @IsPositive()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  seller: string;
}

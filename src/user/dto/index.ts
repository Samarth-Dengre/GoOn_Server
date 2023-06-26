import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class Cart_Item_Dto {
  @IsString()
  @IsNotEmpty()
  product: string;

  @IsNumber()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  seller: string;
}

import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsString,
  Min,
  IsInt,
  ValidateNested,
  IsNumber,
  Validate,
} from 'class-validator';

export class OrderItemsDto {
  @IsString()
  @IsNotEmpty()
  product: string;

  @IsString()
  @IsNotEmpty()
  store: string;

  @IsNotEmpty({ message: 'Quantity cannot be empty' })
  @IsInt()
  @Min(1, { message: 'Quantity cannot be less than 1' })
  quantity: number;
}

export class AddressDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  @IsNumber()
  pincode: number;
}

export class OrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemsDto)
  orderItems: OrderItemsDto[];

  @IsString()
  @IsNotEmpty()
  modeOfPayment: string;

  @ValidateNested()
  @Type(() => AddressDto)
  deliveryAddress: AddressDto;
}

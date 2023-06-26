import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  ValidateNested,
  IsIn,
  IsOptional,
} from 'class-validator';

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

  @IsOptional()
  @IsString()
  landmark: string;

  @IsNotEmpty()
  @IsString()
  pincode: string;
}

export class OrderDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(['COD', 'UPI', 'DEBITCARD', 'CREDITCARD'])
  modeOfPayment: string;

  @ValidateNested()
  @Type(() => AddressDto)
  deliveryAddress: AddressDto;
}

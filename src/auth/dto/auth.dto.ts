import { IsString, IsNotEmpty, IsEmail, Length, Equals } from 'class-validator';

export class Signup_Dto {
  @IsNotEmpty()
  @IsString()
  @Length(2)
  userName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6)
  password: string;

  @IsNotEmpty()
  @IsString()
  @Length(6)
  confirmPassword: string;
}

export class Login_Dto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6)
  password: string;
}

import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class ValidationUserDto {
  @IsNotEmpty()
  name: string;

  @MaxLength(8)
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @MinLength(5)
  @IsNotEmpty()
  password: string;
}

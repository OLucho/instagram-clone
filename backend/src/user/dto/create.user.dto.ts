import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class ValidationUserDto {
  @IsNotEmpty()
  name;

  @MaxLength(8)
  @IsNotEmpty()
  username;

  @IsNotEmpty()
  @IsEmail()
  email;

  @MinLength(5)
  @IsNotEmpty()
  password;
}

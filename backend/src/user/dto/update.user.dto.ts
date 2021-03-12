import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto {
  @MaxLength(8)
  name: string;

  username: string;

  @IsEmail()
  email: string;

  @MinLength(5)
  password: string;

  bio: string;
}

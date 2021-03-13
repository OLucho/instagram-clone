import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto {
  name: string;

  @MaxLength(8)
  username: string;

  @IsEmail()
  email: string;

  @MinLength(5)
  password: string;

  @MaxLength(20)
  bio: string;
}

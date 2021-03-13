import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto {
  @MaxLength(8)
  name: string;

  @MaxLength(8)
  username: string;

  @IsEmail()
  email: string;

  @MinLength(5)
  password: string;

  bio: string;
}

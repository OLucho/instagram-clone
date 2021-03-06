import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ValidationUserDto } from './dto/create.user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createUser(
    @Body() validationUserDto: ValidationUserDto,
  ): Promise<User> {
    const { username, email } = validationUserDto;
    const user = await this.userService.isUserAlreadyCreated(username, email);

    if (user) {
      if (user.username === username) {
        throw new BadRequestException('Username Already Exists');
      }
      if (user.email === email) {
        throw new BadRequestException('Email Already Exists');
      }
    }
    return this.userService.createUser(validationUserDto);
  }
}

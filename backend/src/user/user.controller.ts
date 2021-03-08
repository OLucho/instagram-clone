import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorator/get.user';
import { ValidationUserDto } from './dto/create.user.dto';
import { SignInDto } from './dto/signIn.dto';
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

  @Get('/signin')
  signIn(@Body() signInDto: SignInDto) {
    return this.userService.signIn(signInDto);
  }

  @Get('/:username')
  async view(@Param('username') username: string) {
    const user = await this.userService.getUserByUsername(username);
    return user;
  }

  @Get('/me')
  @UseGuards(AuthGuard())
  me(@GetUser() user: User) {
    return user;
  }
}

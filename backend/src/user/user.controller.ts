import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
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

  @Post('/signin')
  signIn(@Body() signInDto: SignInDto): Promise<{ accessToken: string }> {
    return this.userService.signIn(signInDto);
  }

  @Get('/:username')
  async view(@Param('username') username: string): Promise<User> {
    const user = await this.userService.getUserByUsername(username);
    return user;
  }

  @Post('/avatar')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard())
  async updateAvatar(
    @UploadedFile() file: Express.Multer.File,
    @GetUser() user: User,
  ): Promise<void> {
    const avatar = file.buffer.toString('base64');
    return this.userService.updateAvatar(avatar, user);
  }

  @Get('/me')
  @UseGuards(AuthGuard())
  me(@GetUser() user: User): User {
    return user;
  }
}

import {
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
import { PhotoService } from 'src/photo/photo.service';
import { GetUser } from './decorator/get.user';
import { ValidationUserDto } from './dto/create.user.dto';
import { SignInDto } from './dto/signIn.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private photoService: PhotoService,
  ) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createUser(
    @Body() validationUserDto: ValidationUserDto,
  ): Promise<User> {
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

  @Get('/auth/me')
  @UseGuards(AuthGuard())
  getUserFromToken(@GetUser() user: User): User {
    return user;
  }
}

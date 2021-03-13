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
import { FollowService } from 'src/follow/follow.service';
import { PhotoService } from 'src/photo/photo.service';
import { GetUser } from './decorator/get.user';
import { ValidationUserDto } from './dto/create.user.dto';
import { SignInDto } from './dto/signIn.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private photoService: PhotoService,
    private followService: FollowService,
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
  @UseGuards(AuthGuard())
  async view(@Param('username') username: string, @GetUser() User: User) {
    const user = await this.userService.getUserByUsername(username);
    const userPhotosCount = await this.photoService.getAllUserPhotosCount(
      user.id,
    );
    const userFollowsCount = await this.followService.getUserFollows(user.id);
    const userFollowersCount = await this.followService.getUserFollowers(
      user.id,
    );
    let isProfile = false;
    if (user.id === User.id) {
      isProfile = true;
    }

    const isFollow = await this.followService.getFollow(user.id, User.id); // (users profile, user logged in)

    return {
      user,
      userPhotosCount,
      userFollowsCount,
      userFollowersCount,
      isProfile,
      isFollow: isFollow ? true : false,
    };
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

  @Post('/update')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() user: User,
  ) {
    return this.userService.updateUser(updateUserDto, user);
  }

  @Get('/auth/me')
  @UseGuards(AuthGuard())
  getUserFromToken(@GetUser() user: User): User {
    return user;
  }

  @Get('/search/:term')
  @UseGuards(AuthGuard())
  searchUsers(@Param('term') term: string) {
    return this.userService.searchUsers(term);
  }
}

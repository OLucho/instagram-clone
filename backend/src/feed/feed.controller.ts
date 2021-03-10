import {
  Controller,
  Get,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PhotoService } from 'src/photo/photo.service';
import { GetUser } from 'src/user/decorator/get.user';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { FeedService } from './feed.service';

@Controller('feed')
export class FeedController {
  constructor(
    private feedService: FeedService,
    private userService: UserService,
    private photoService: PhotoService,
  ) {}

  @Get()
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  async FeedData(@GetUser() User: User) {
    const user = await this.userService.getUserFollows(User.id);
    const arrayUsersId = user.following.map((_user) => _user.userToId);
    arrayUsersId.push(User.id); // because we also want to show our photos in feed

    const feedsPhotos = await this.photoService.getFeedPhotos(arrayUsersId);

    return this.feedService.getFeedData(feedsPhotos, User.id);
  }
}

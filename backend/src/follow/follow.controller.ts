import {
  BadRequestException,
  Controller,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/user/decorator/get.user';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { FollowService } from './follow.service';

@Controller('follow')
export class FollowController {
  constructor(
    private followService: FollowService,
    private userService: UserService,
  ) {}

  @Post('/:userId')
  @UseGuards(AuthGuard())
  async handleFollow(@Param('userId') userId: number, @GetUser() User: User) {
    const user = await this.userService.getUserById(userId);
    if (user.id === User.id) {
      throw new BadRequestException('You cant follow Yourself..');
    }

    const follow = await this.followService.getFollow(user.id, User.id); // (user to follow, user logged in)
    if (follow) {
      return await this.followService.deleteFollowById(follow.id);
    } else {
      return await this.followService.createFollow(user.id, User.id); // (user to follow, user logged in)
    }
  }
}

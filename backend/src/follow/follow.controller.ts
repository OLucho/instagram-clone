import { Controller, Param, Post, UseGuards } from '@nestjs/common';
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
  async signIn(@Param('userId') userId: number, @GetUser() user: User) {}
}

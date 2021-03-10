import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user.entity';

@Injectable()
export class FeedService {
  getUsersInFeed(user: User) {
    return user.following;
  }
}

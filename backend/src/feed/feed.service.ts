import { Injectable } from '@nestjs/common';
import { Like } from 'src/like/like.entity';
import { Photo } from 'src/photo/photo.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class FeedService {
  getUsersInFeed(user: User) {
    return user.following;
  }

  async getFeedData(
    feedsPhotos,
    userId: number,
  ): Promise<{ isAuthor: boolean; isLiked: boolean; photo: Photo }> {
    return feedsPhotos.map((photo: Photo) => {
      let isAuthor = false;
      if (photo.userId === userId) {
        isAuthor = true;
      }
      let isLiked = false;
      photo.likes.map((like: Like) => {
        if (like.userId === userId) {
          isLiked = true;
        }
      });
      return { isAuthor, isLiked, photo };
    });
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/db.config';
import { UserModule } from './user/user.module';
import { PhotoModule } from './photo/photo.module';
import { LikeModule } from './like/like.module';
import { CommentModule } from './comment/comment.module';
import { FollowModule } from './follow/follow.module';
import { FeedModule } from './feed/feed.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    UserModule,
    PhotoModule,
    LikeModule,
    CommentModule,
    FollowModule,
    FeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

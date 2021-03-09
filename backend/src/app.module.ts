import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/db.config';
import { UserModule } from './user/user.module';
import { PhotoModule } from './photo/photo.module';
import { LikeModule } from './like/like.module';
import { CommentModule } from './comment/comment.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    UserModule,
    PhotoModule,
    LikeModule,
    CommentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

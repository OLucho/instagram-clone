import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoModule } from 'src/photo/photo.module';
import { UserModule } from 'src/user/user.module';
import { LikeController } from './like.controller';
import { LikeRepository } from './like.repository';
import { LikeService } from './like.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([LikeRepository]),
    UserModule,
    PhotoModule,
  ],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}

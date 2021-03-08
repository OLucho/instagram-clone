import { Module } from '@nestjs/common';
import { PhotoModule } from 'src/photo/photo.module';
import { UserModule } from 'src/user/user.module';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';

@Module({
  imports: [UserModule, PhotoModule],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}

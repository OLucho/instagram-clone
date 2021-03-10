import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { FollowController } from './follow.controller';
import { FollowRepository } from './follow.repository';
import { FollowService } from './follow.service';

@Module({
  imports: [TypeOrmModule.forFeature([FollowRepository]), UserModule],
  controllers: [FollowController],
  providers: [FollowService],
})
export class FollowModule {}

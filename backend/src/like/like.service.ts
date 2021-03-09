import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LikeRepository } from './like.repository';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(LikeRepository) private likeRepository: LikeRepository,
  ) {}
  async findLikeByUserAndLikeId(userId: number, photoId: number) {
    return this.likeRepository.findLikeByUserAndLikeId(userId, photoId);
  }
}

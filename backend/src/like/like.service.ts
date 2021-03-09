import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './like.entity';
import { LikeRepository } from './like.repository';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(LikeRepository) private likeRepository: LikeRepository,
  ) {}
  async findLikeByUserAndPhotoId(
    userId: number,
    photoId: number,
  ): Promise<Like> {
    return this.likeRepository.findLikeByUserAndPhotoId(userId, photoId);
  }

  async addLike(userId: number, photoId: number): Promise<Like> {
    return this.likeRepository.addLike(userId, photoId);
  }

  async removeLike(like: Like): Promise<void> {
    return this.likeRepository.removeLike(like);
  }
}

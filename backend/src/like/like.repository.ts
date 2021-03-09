import { EntityRepository, Repository } from 'typeorm';
import { Like } from './like.entity';

@EntityRepository(Like)
export class LikeRepository extends Repository<Like> {
  async findLikeByUserAndPhotoId(
    userId: number,
    photoId: number,
  ): Promise<Like> {
    return this.createQueryBuilder('like')
      .where('like.photoId = :photoId AND like.userId = :userId', {
        photoId,
        userId,
      })
      .getOne();
  }

  async addLike(userId: number, photoId: number): Promise<Like> {
    const like = new Like();
    like.userId = userId;
    like.photoId = photoId;

    await like.save();
    return like;
  }

  async removeLike(like: Like): Promise<void> {
    like.remove();
  }
}

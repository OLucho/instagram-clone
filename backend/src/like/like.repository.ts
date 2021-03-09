import { EntityRepository, Repository } from 'typeorm';
import { Like } from './like.entity';

@EntityRepository(Like)
export class LikeRepository extends Repository<Like> {
  async findLikeByUserAndLikeId(userId, photoId) {
    return await this.createQueryBuilder('like')
      .where('like.photoId = :photoId', {
        photoId,
      })
      .getOne();
  }
}

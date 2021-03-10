import { EntityRepository, Repository } from 'typeorm';
import { Follow } from './follow.entity';

@EntityRepository(Follow)
export class FollowRepository extends Repository<Follow> {
  async getFollow(userToId, userFromId) {
    return this.createQueryBuilder('follow')
      .where(
        'follow.userToId = :userToId AND follow.userFromId = :userFromId',
        {
          userFromId,
          userToId,
        },
      )
      .getOne();
  }

  async createFollow(follow: Follow): Promise<Follow> {
    return await follow.save();
  }

  async deleteFollowById(id: number) {
    return await this.delete(id);
  }

  async getUserFollows(userFromId: number): Promise<number> {
    return await this.createQueryBuilder('follow')
      .where('follow.userFromId = :userFromId', {
        userFromId,
      })
      .getCount();
  }

  async getUserFollowers(userToId: number): Promise<number> {
    return await this.createQueryBuilder('follow')
      .where('follow.userToId = :userToId', {
        userToId,
      })
      .getCount();
  }
}

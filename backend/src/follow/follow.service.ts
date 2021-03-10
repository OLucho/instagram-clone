import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Follow } from './follow.entity';
import { fromDtoToEntity } from './follow.mapper';
import { FollowRepository } from './follow.repository';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(FollowRepository)
    private followRepository: FollowRepository,
  ) {}

  async getFollow(userToId: number, userFromId: number) {
    return this.followRepository.getFollow(userToId, userFromId);
  }

  async createFollow(userToId: number, userFromId: number) {
    const follow = fromDtoToEntity(userToId, userFromId);
    return this.followRepository.createFollow(follow);
  }

  async deleteFollowById(id: number) {
    return this.followRepository.deleteFollowById(id);
  }

  async getUserFollows(userId: number) {
    return this.followRepository.getUserFollows(userId);
  }

  async getUserFollowers(userId: number) {
    return this.followRepository.getUserFollowers(userId);
  }
}

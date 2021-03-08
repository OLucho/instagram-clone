import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { PhotoRepository } from './photo.repository';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(PhotoRepository) private photoRepository: PhotoRepository,
  ) {}

  async uploadPhoto(key: string, user: User, photoBody: string) {
    return await this.photoRepository.uploadPhoto(key, user, photoBody);
  }

  async getPhotoById(id: number, user: User) {
    const photo = await this.photoRepository.getPhotoById(id);
    if (!photo) {
      throw new NotFoundException('Photo not found');
    }

    let isAuthor = false;
    if (photo.userId === user.id) {
      isAuthor = true;
    }
    return { photo, isAuthor };
  }
}

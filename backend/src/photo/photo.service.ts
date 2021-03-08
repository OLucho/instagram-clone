import { Injectable } from '@nestjs/common';
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
}

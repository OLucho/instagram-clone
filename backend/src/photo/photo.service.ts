import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Photo } from './photo.entity';
import { PhotoRepository } from './photo.repository';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(PhotoRepository) private photoRepository: PhotoRepository,
  ) {}

  async uploadPhoto(key: string, user: User, photoBody: string) {
    const photo = await this.photoRepository.uploadPhoto(key, user, photoBody);

    let isAuthor = false;
    if (photo.userId === user.id) {
      isAuthor = true;
    }
    return { photo, isAuthor };
  }

  async getPhotoById(id: number): Promise<Photo> {
    const photo = await this.photoRepository.getPhotoById(id);
    if (!photo) {
      throw new NotFoundException('Photo not found');
    }

    return photo;
  }

  async deletePhotoById(id: number, user: User): Promise<void> {
    const photo = await this.getPhotoById(id);
    if (photo.userId !== user.id) {
      throw new UnauthorizedException('Unauthorized');
    }
    return this.photoRepository.deletePhotoById(photo.id);
  }
}

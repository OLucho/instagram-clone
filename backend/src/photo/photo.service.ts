import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Photo } from './photo.entity';
import { fromDtoToEntity } from './photo.mapper';
import { PhotoRepository } from './photo.repository';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(PhotoRepository) private photoRepository: PhotoRepository,
  ) {}

  async uploadPhoto(key: string, user: User, photoBody: string) {
    const photoToSave = fromDtoToEntity(key, user, photoBody);
    const photo = await this.photoRepository.uploadPhoto(photoToSave);

    const photoCreated = await this.getPhotoById(photo.id);
    let isAuthor = false;
    if (photoCreated.userId === user.id) {
      isAuthor = true;
    }

    let isLiked = false;
    photoCreated.likes.map((like) => {
      if (like.userId === user.id) {
        isLiked = true;
      }
    });
    return { photoCreated, isAuthor, isLiked };
  }

  async getPhotoById(id: number): Promise<Photo> {
    const photo = await this.photoRepository.getPhotoById(id);
    if (!photo) {
      throw new NotFoundException('Photo not found');
    }

    return photo;
  }

  async getAllUserPhotosCount(userId: number) {
    return this.photoRepository.getAllUserPhotosCount(userId);
  }

  async getFeedPhotos(arrayUsersId: Array<number>) {
    return await this.photoRepository.getFeedPhotos(arrayUsersId);
  }

  async deletePhotoById(id: number, user: User): Promise<void> {
    const photo = await this.getPhotoById(id);
    if (photo.userId !== user.id) {
      throw new UnauthorizedException('Unauthorized');
    }
    return this.photoRepository.deletePhotoById(photo.id);
  }
}

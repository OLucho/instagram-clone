import { EntityRepository, Repository } from 'typeorm';
import { Photo } from './photo.entity';
import { User } from 'src/user/user.entity';

@EntityRepository(Photo)
export class PhotoRepository extends Repository<Photo> {
  async uploadPhoto(key: string, user: User, photoBody: string) {
    const photo = new Photo();
    photo.body = photoBody;
    photo.key = key;
    photo.user = user;
    photo.userId = user.id;
    await photo.save();

    return photo;
  }

  async getPhotoById(id: number) {
    return this.findOne({ where: { id }, relations: ['user'] });
  }
}

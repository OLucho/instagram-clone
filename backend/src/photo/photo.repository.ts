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
    await photo.save();

    return photo;
  }
}

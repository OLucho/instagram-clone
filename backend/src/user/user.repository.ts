import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(user: User): Promise<User> {
    return user.save();
  }

  async isUserAlreadyCreated(username: string, email: string): Promise<User> {
    return this.createQueryBuilder()
      .where('username = :username OR email = :email', {
        username,
        email,
      })
      .getOne();
  }
}

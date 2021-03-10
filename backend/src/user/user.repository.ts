import { EntityRepository, Repository } from 'typeorm';
import { SignInDto } from './dto/signIn.dto';
import { User } from './user.entity';
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(user: User): Promise<User> {
    return user.save();
  }

  async getUserByUsername(username: string): Promise<User> {
    return this.findOne({ where: { username } });
  }

  async isUserAlreadyCreated(username: string, email: string): Promise<User> {
    return this.createQueryBuilder()
      .where('username = :username OR email = :email', {
        username,
        email,
      })
      .getOne();
  }

  async getUserById(id: number) {
    return await this.findOne({ where: { id } });
  }

  async updateAvatar(avatar: string, user: User): Promise<void> {
    user.avatar = avatar;
  }

  async signIn(signInDto: SignInDto): Promise<User> {
    const { username } = signInDto;

    return this.createQueryBuilder('user')
      .where('user.username = :username', { username })
      .getOne();
  }
}

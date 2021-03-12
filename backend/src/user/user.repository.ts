import { EntityRepository, Repository } from 'typeorm';
import { SignInDto } from './dto/signIn.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { User } from './user.entity';
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(user: User): Promise<User> {
    return user.save();
  }

  async getUserByUsername(username: string): Promise<User> {
    return this.findOne({ where: { username }, relations: ['photos'] });
  }

  async getUserFollows(id: number) {
    return await this.findOne({
      where: { id },
      relations: ['following'],
    });
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

  async getFollowsData(arrayUsersId) {
    return await this.createQueryBuilder('user')
      .where('user.id IN (:...arrayUsersId)', { arrayUsersId })
      .getMany();
  }

  async updateAvatar(avatar: string, user: User): Promise<void> {
    user.avatar = avatar;
    user.save();
  }

  async updateUser(updateUserDto: UpdateUserDto, user: User) {
    const { bio, email, name, password, username } = updateUserDto;

    user.bio = bio;
    user.email = email;
    user.name = name;
    user.username = username;
    user.password = password;
    user.save();
    return user;
  }

  async signIn(signInDto: SignInDto): Promise<User> {
    const { username } = signInDto;

    return this.createQueryBuilder('user')
      .where('user.username = :username', { username })
      .getOne();
  }

  async searchUsers(term) {
    return this.createQueryBuilder('user')
      .where('user.username LIKE :term OR user.name LIKE :term', { term })
      .getMany();
  }
}

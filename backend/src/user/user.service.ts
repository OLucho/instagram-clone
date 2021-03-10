import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { fromDtoToEntity } from './user.mapper';
import { ValidationUserDto } from './dto/create.user.dto';
import { SignInDto } from './dto/signIn.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async createUser(validationUserDto: ValidationUserDto): Promise<User> {
    const { username, email } = validationUserDto;
    await this.isUserAlreadyCreated(username, email);

    const userEntity = fromDtoToEntity(validationUserDto);
    return this.userRepository.createUser(userEntity);
  }

  async getUserByUsername(username: string): Promise<User> {
    const user = await this.userRepository.getUserByUsername(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    delete user.password;
    return user;
  }

  async updateAvatar(avatar: string, user: User): Promise<void> {
    return this.userRepository.updateAvatar(avatar, user);
  }

  async getUserById(id: number) {
    const user = await this.userRepository.getUserById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async isUserAlreadyCreated(username: string, email: string): Promise<void> {
    const user = await this.userRepository.isUserAlreadyCreated(
      username,
      email,
    );
    if (user) {
      if (user.username === username) {
        throw new BadRequestException('Username Already Exists');
      }
      if (user.email === email) {
        throw new BadRequestException('Email Already Exists');
      }
    }
  }

  async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
    const { password } = signInDto;
    const user = await this.userRepository.signIn(signInDto);
    if (!user) {
      throw new BadRequestException('User Incorrect');
    }
    if (password !== user.password) {
      throw new BadRequestException('Password Incorrect');
    }

    const { username } = user;
    const payload = { username };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}

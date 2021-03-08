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

  async isUserAlreadyCreated(username: string, email: string): Promise<User> {
    return this.userRepository.isUserAlreadyCreated(username, email);
  }

  async signIn(signInDto: SignInDto) {
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

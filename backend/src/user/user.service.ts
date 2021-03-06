import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { fromDtoToEntity } from './user.mapper';
import { ValidationUserDto } from './dto/create.user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async createUser(validationUserDto: ValidationUserDto): Promise<User> {
    const userEntity = fromDtoToEntity(validationUserDto);
    return this.userRepository.createUser(userEntity);
  }

  async isUserAlreadyCreated(username: string, email: string): Promise<User> {
    return this.userRepository.isUserAlreadyCreated(username, email);
  }
}

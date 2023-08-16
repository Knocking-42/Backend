import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfile } from './user-profile';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  //TODO: upsert로 변경하기
  async create(userProfile: UserProfile) {
    return this.userRepository.save({
      name: userProfile.name,
      email: userProfile.email,
      authType: userProfile.authType,
    });
  }
}

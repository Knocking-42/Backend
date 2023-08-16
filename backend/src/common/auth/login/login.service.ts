import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'common/database/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async loginByName(userName: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({
      username: userName,
    });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async loginById(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({
      id: userId,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}

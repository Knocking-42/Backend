import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../../common/database/user/user.entity';

@Injectable()
export class GetUserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAllUser(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  // async findOneByIdOrFail(id: number): Promise<User> {
  //   const user = await this.userRepository.findOne({
  //     where: { id },
  //   });

  //   if (!user) {
  //     throw new NotFoundException(`User with id ${id} not found`);
  //   }

  //   return user;
  // }
}

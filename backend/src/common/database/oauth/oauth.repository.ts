import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user';
import { OauthEntity } from './oauth.entity';
import { OauthType } from './oauth.type';

@Injectable()
export class OauthRepository {
  constructor(
    @InjectRepository(OauthEntity)
    private readonly oauthRepository: Repository<OauthEntity>,
  ) {}

  async create(
    userId: number,
    oauthId: string,
    type: OauthType,
  ): Promise<OauthEntity> {
    return await this.oauthRepository.save({
      userId: userId,
      oauthId: oauthId,
      type: type,
    });
  }

  async findByOauthId(oauthId: string, type: OauthType): Promise<UserEntity> {
    const oauth = await this.oauthRepository.findOne({
      where: {
        oauthId: oauthId,
        type: type,
      },
      relations: ['user'],
    });
    return oauth?.user;
  }
}

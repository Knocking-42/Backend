import { Injectable, UnauthorizedException } from '@nestjs/common';
import { OauthRepository, OauthType } from 'common/database/oauth';
import { UserRepository } from 'common/database/user';
import { UserEntity } from 'common/database/user/user.entity';

@Injectable()
export class LoginService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly oauthRepository: OauthRepository,
  ) {}

  async loginByOauth(
    oauthProfile: any,
    oauthType: OauthType,
  ): Promise<UserEntity> {
    const user = await this.oauthRepository.findByOauthId(
      oauthProfile.id,
      oauthType,
    );

    if (!user) {
      const user = await this.userRepository.create(
        oauthProfile.name,
        oauthProfile.email,
      );
      await this.oauthRepository.create(
        user.id,
        oauthProfile.providerId,
        oauthType,
      );
      return user;
    }
    return user;
  }

  async loginById(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findByUserId(userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}

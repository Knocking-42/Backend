import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { KakaoProfile } from './kakao-profile';

@Injectable()
export class KakaoAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get('KAKAO_CLIENT_ID'),
      clientSecret: configService.getOrThrow('KAKAO_CLIENT_SECRET'),
      callbackURL: 'http://localhost:8888/auth/kakao/callback',
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    user: any,
    done: (error: any, user?: any, info?: any) => void,
  ) {
    try {
      const kakaoUser: KakaoProfile = {
        provider: user.provider,
        providerId: user.id,
        name: user.username,
        email: user._json.kakao_account.email,
      };
      done(null, kakaoUser);
    } catch (error) {
      done(error);
    }
  }
}

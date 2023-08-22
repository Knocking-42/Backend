import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { KakaoAuthStrategy } from './kakao-auth.strategy';

@Module({
  imports: [PassportModule],
  providers: [KakaoAuthStrategy],
})
export class KakaoAuthModule {}

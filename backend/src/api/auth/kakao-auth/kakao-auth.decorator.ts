import { UseGuards } from '@nestjs/common';
import { KakaoAuthGuard } from './kakao-auth.guard';

export const KakaoAuth = () => UseGuards(KakaoAuthGuard);

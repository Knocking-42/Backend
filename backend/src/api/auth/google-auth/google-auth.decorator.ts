import { UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './google-auth.guard';

export const GoogleAuth = () => UseGuards(GoogleAuthGuard);

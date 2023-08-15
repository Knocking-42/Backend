import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GoogleAuthStrategy } from './google-auth.strategy';

@Module({
  imports: [PassportModule],
  providers: [GoogleAuthStrategy],
})
export class GoogleAuthModule {}

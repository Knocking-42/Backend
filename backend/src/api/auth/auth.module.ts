import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CookieManagerModule } from 'common/auth/cookie/cookie-manager.module';
import { JwtAuthStrategy } from 'common/auth/jwt/jwt-auth.strategy';
import { JwtModule } from 'common/auth/jwt/jwt.module';
import { LoginModule } from 'common/auth/login/login.module';
import { UserEntity } from 'common/database/user/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.services';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    LoginModule,
    JwtModule.forRoot(),
    CookieManagerModule,
  ],
  providers: [AuthService, JwtAuthStrategy],
  controllers: [AuthController],
})
export class AuthModule {}

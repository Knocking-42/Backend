import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'common/database/entities/user.entity';
import { LoginModule } from '../login/login.module';
import { JwtAuthStrategy } from './jwt-auth.strategy';
import { JwtModule } from './jwt.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule,
    LoginModule,
    PassportModule,
  ],
  providers: [JwtAuthStrategy],
  exports: [JwtAuthStrategy],
})
export class JwtAuthMoudle {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'common/database/user/user.entity';
import { LoginService } from './login.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [LoginService],
  exports: [LoginService],
})
export class LoginModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'common/database/entities/user.entity';
import { GetUserService } from './services/get-all-user.service';
import { RegisterUserService } from './services/register-user.service';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [GetUserService, RegisterUserService],
  controllers: [UserController],
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { UserRepositoryModule } from 'common/database/user';
import { GetUserService } from './services/get-all-user.service';
import { UserController } from './user.controller';

@Module({
  imports: [UserRepositoryModule],
  providers: [GetUserService],
  controllers: [UserController],
})
export class UserModule {}

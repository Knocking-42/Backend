import { Module } from '@nestjs/common';
import { OauthRepositoryModule } from 'common/database/oauth';
import { UserRepositoryModule } from 'common/database/user';
import { LoginService } from './login.service';

@Module({
  imports: [UserRepositoryModule, OauthRepositoryModule],
  providers: [LoginService],
  exports: [LoginService],
})
export class LoginModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user';
import { OauthEntity } from './oauth.entity';
import { OauthRepository } from './oauth.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, OauthEntity])],
  providers: [OauthRepository],
  exports: [TypeOrmModule, OauthRepository],
})
export class OauthRepositoryModule {}

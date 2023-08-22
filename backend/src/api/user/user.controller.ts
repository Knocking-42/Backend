import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserEntity } from 'common/database/user/user.entity';
import { GetUserService } from './services/get-all-user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly getUserService: GetUserService) {}

  @Get()
  @ApiOperation({ summary: '유저 목록 가져오기(테스트용)' })
  @ApiOkResponse({ description: '유저 목록', type: UserEntity, isArray: true })
  async all(): Promise<UserEntity[]> {
    return await this.getUserService.findAllUser();
  }
}

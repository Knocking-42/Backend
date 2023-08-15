import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserEntity } from 'common/database/entities/user.entity';
import { LogisProfileDto } from './dto/register-response.dto';
import { RegisterRequestDto } from './dto/user-register-request.dto';
import { GetUserService } from './services/get-all-user.service';
import { RegisterUserService } from './services/register-user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly getUserService: GetUserService,
    private readonly registerUserService: RegisterUserService,
  ) {}

  @Get()
  @ApiOperation({ summary: '유저 목록 가져오기(테스트용)' })
  @ApiOkResponse({ description: '유저 목록', type: UserEntity, isArray: true })
  async all(): Promise<UserEntity[]> {
    return await this.getUserService.findAllUser();
  }

  @Post('register')
  @ApiOperation({ summary: '유저 회원가입' })
  @ApiOkResponse({ description: '유저 회원가입 성공', type: LogisProfileDto })
  async register(
    @Body() registerRequestDto: RegisterRequestDto,
  ): Promise<LogisProfileDto> {
    return await this.registerUserService.create(registerRequestDto);
  }
}

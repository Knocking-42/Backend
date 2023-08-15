import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'common/auth/jwt/jwt-auth.guard';
import { LoginService } from 'common/auth/login/login.service';
import { UserEntity } from 'common/database/entities/user.entity';
import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { LoginRequestDto } from './dto/login-request.dto';
import { GoogleAuth } from './google-auth';
import { AuthService } from './services/auth.services';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private readonly logger: Logger = new Logger(AuthController.name);
  constructor(
    private readonly authService: AuthService,
    private readonly loginService: LoginService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  @Post('/signin')
  @ApiOperation({ summary: '로그인' })
  @ApiOkResponse({ description: '로그인 성공' })
  async login(
    @Body() loginRequestDto: LoginRequestDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    return await this.authService.login(response, loginRequestDto);
  }

  @Get('google')
  @ApiOperation({ summary: '구글 로그인' })
  async googlelAuth(): Promise<void> {
    return;
  }

  @Get('google/callback')
  @GoogleAuth()
  async googleAuthRedirect(@Req() req: Request): Promise<void> {
    const user = req.user;

    await this.userRepository.save();
  }

  @Get('test')
  @UseGuards(JwtAuthGuard)
  test(@Req() req: Request) {
    console.log(req);
  }

  @Delete('/signout')
  @ApiOperation({ summary: '로그아웃' })
  @ApiOkResponse({ description: '로그아웃 성공' })
  signout(@Res({ passthrough: true }) response: Response): void {
    return this.authService.signout(response);
  }
}

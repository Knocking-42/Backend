import {
  Controller,
  Delete,
  Get,
  Logger,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthUser } from 'common/auth/auth-user.decorator';
import { JwtAuthGuard } from 'common/auth/jwt/jwt-auth.guard';
import { LoginService } from 'common/auth/login/login.service';
import { OauthType } from 'common/database/oauth';
import { Request, Response } from 'express';
import { GoogleAuth } from './google-auth';
import { GoogleProfile } from './google-auth/google-profile';
import { AuthService } from './services/auth.services';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private readonly logger: Logger = new Logger(AuthController.name);
  constructor(
    private readonly authService: AuthService,
    private readonly loginService: LoginService,
  ) {}

  @Get('google')
  @GoogleAuth()
  @ApiOperation({
    summary: '구글 로그인',
    description:
      "구글 로그인 페이지로 리다이렉트 <a href='/auth/google'> Please cmd + click me! </a>",
  })
  async googlelAuth(): Promise<void> {
    return;
  }

  @Get('google/callback')
  @GoogleAuth()
  async googleCallback(
    @AuthUser() profile: GoogleProfile,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const user = await this.loginService.loginByOauth(
      profile,
      OauthType.GOOGLE,
    );

    await this.authService.login(res, user);
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

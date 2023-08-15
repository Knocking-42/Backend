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
import { JwtAuthGuard } from 'common/auth/jwt/jwt-auth.guard';
import { Request, Response } from 'express';
import { LoginRequestDto } from './dto/login-request.dto';
import { AuthService } from './services/auth.services';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private readonly logger: Logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  @ApiOperation({ summary: '로그인' })
  @ApiOkResponse({ description: '로그인 성공' })
  async login(
    @Body() loginRequestDto: LoginRequestDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    return await this.authService.login(response, loginRequestDto);
  }

  @Get('/test')
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

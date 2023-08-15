import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CookieManager } from 'common/auth/cookie/cookie.manager';
import { JwtPaylaod } from 'common/auth/jwt/jwt.payload';
import { LoginService } from 'common/auth/login/login.service';
import { pwCompare } from 'common/utils/encrypt';
import { Response } from 'express';
import { LoginRequestDto } from '../dto/login-request.dto';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);
  constructor(
    private readonly loginService: LoginService,
    private readonly jwtService: JwtService,
    private readonly cookieManager: CookieManager,
  ) {}

  async login(response: Response, loginDto: LoginRequestDto): Promise<void> {
    const user = await this.loginService.loginByName(loginDto.name);

    if (!pwCompare(loginDto.password, user.password)) {
      this.logger.verbose(
        `${AuthService.name} login: Invalid password: ${loginDto.password}, ${user.password}`,
      );
      throw new UnauthorizedException('Invalid password');
    }

    const jwt = this.jwtService.sign({ id: user.id } as JwtPaylaod);

    this.cookieManager.set(response, {
      name: 'knocking',
      value: jwt,
    });
  }

  signout(response: Response): void {
    this.cookieManager.clear(response, {
      name: 'knocking',
    });
  }
}

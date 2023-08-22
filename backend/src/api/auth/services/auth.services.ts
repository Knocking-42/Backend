import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CookieManager } from 'common/auth/cookie/cookie.manager';
import { JwtPaylaod } from 'common/auth/jwt/jwt.payload';
import { LoginService } from 'common/auth/login/login.service';
import { UserEntity } from 'common/database/user';
import { Response } from 'express';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);
  constructor(
    private readonly loginService: LoginService,
    private readonly jwtService: JwtService,
    private readonly cookieManager: CookieManager,
  ) {}

  async login(response: Response, user: UserEntity): Promise<void> {
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

import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { UserEntity } from 'common/database/user/user.entity';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { LoginService } from '../login/login.service';
import { JwtPaylaod } from './jwt.payload';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, 'jwt-auth') {
  private readonly logger = new Logger(JwtAuthStrategy.name);
  constructor(
    private readonly loginService: LoginService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request): string => {
          return request.cookies['knocking'];
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('JWT_SECRET'),
    });
  }

  async validate(
    payload: JwtPaylaod,
    done: (err: unknown, data: UserEntity) => void,
  ): Promise<void> {
    if (!payload.id) {
      throw new UnauthorizedException('Invalid JwtPyaload token');
    }
    const user = await this.loginService.loginById(payload.id);
    done(null, user);
  }
}

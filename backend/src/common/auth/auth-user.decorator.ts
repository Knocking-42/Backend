import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserEntity } from 'common/database/entities/user.entity';

export const AuthUser = createParamDecorator(
  (data, ctx: ExecutionContext): UserEntity => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

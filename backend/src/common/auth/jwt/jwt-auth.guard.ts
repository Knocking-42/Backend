import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt-auth') {
  handleRequest<TUser>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    try {
      return super.handleRequest(err, user, info, context, status);
    } catch (e: unknown) {
      throw new UnauthorizedException(`${e}: Should sign in first`);
    }
  }
}

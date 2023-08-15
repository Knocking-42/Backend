import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule as _JwtModule } from '@nestjs/jwt';

export class JwtModule {
  static forRoot() {
    return _JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secretOrPrivateKey: configService.getOrThrow('JWT_SECRET'),
        signOptions: { expiresIn: '7d' },
      }),
    });
  }
}

import { Module } from '@nestjs/common';
import { CookieManager } from './cookie.manager';

@Module({
  providers: [CookieManager],
  exports: [CookieManager],
})
export class CookieManagerModule {}

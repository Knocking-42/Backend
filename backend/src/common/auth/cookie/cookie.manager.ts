import { Injectable } from '@nestjs/common';
import { CookieOptions, Response } from 'express';

@Injectable()
export class CookieManager {
  set(
    response: Response,
    cookie: {
      name: string;
      value: string;
    },
  ): void {
    response.cookie(cookie.name, cookie.value);
  }

  clear(
    response: Response,
    cookie: {
      name: string;
    },
  ): void {
    response.clearCookie(cookie.name, this.cookieOptions);
  }

  private get cookieOptions(): CookieOptions {
    const oneHour = 60 * 60 * 1000;
    const maxAge = 7 * 24 * oneHour; // 7days

    return { httpOnly: true, maxAge };
  }
}

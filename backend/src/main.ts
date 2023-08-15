import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { debug } from 'console';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });
  const configService = app.get(ConfigService);

  const originList = configService.get<string>('ORIGIN_LIST') ?? '';
  const originRegex = configService.get<string>('ORIGIN_REGEX')
    ? new RegExp(configService.get<string>('ORIGIN_REGEX'))
    : '';
  const corsOrigin = [
    ...originList.split(',').map(item => item.trim()),
    originRegex,
  ];

  app.enableCors({ origin: corsOrigin, credentials: true });
  app.use(cookieParser());
  app.useBodyParser('text');
  const config = new DocumentBuilder()
    .setTitle(`Knocking Docs`)
    .setDescription(`Knocking api`)
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'Knocking api docs',
    customCss: '.swagger-ui .topbar { display: none }',
  });
  await app.listen(parseInt(configService.getOrThrow('PORT')));
  debug(`Application is running on: ${await app.getUrl()}`);
  debug(
    `Application is listening on port: ${configService.getOrThrow('PORT')}`,
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
}
bootstrap();

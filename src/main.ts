import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  app.enableCors({
    origin: [
      'http://localhost:9000',
      'http://localhost',
      'https://pyshop-frontend.vercel.app',
      'http://dmatern.ru',
      'https://dmatern.ru',
    ],
  });
  app.setGlobalPrefix('api');
  await app.listen(port);
}
bootstrap();

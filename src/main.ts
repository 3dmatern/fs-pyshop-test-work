import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  // const frontendPyShop = configService.get('CORS_ORIGIN_FRONTEND_PYSHOP');

  // app.enableCors({
  //   origin: frontendPyShop,
  // });
  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(port);
}
bootstrap();

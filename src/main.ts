import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  const frontendPyShop = configService.get('CORS_ORIGIN_FRONTEND_PYSHOP');

  app.enableCors({
    origin: frontendPyShop,
  });
  app.setGlobalPrefix('api');
  await app.listen(port);
}
bootstrap();

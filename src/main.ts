import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CONFIG_PORT } from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const configServie = app.get(ConfigService);
  const port = +configServie.get<number>(CONFIG_PORT) || 3000;
  await app.listen(port);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from "@nestjs/common"

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // Here the validation pipe is used for validation API request with help of dto.
  await app.listen(process.env.PORT);
}
bootstrap();

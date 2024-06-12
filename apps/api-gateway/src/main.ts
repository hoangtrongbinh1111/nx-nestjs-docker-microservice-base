/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3334;
  const options = new DocumentBuilder()
    .setTitle('API docs')
    .addTag('users')
    .addTag('tasks')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );

  Logger.log({
    NX_POSTGRES_HOST: process.env.NX_POSTGRES_HOST,
    NX_POSTGRES_PORT: process.env.NX_POSTGRES_PORT,
    NX_POSTGRES_USER: process.env.NX_POSTGRES_USER,
    NX_POSTGRES_DB: process.env.NX_POSTGRES_DB
  })
}

bootstrap();

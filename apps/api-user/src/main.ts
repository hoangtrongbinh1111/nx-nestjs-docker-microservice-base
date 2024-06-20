import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { Transport, TcpOptions } from '@nestjs/microservices';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { ConfigService } from './services/config/config.service';

async function bootstrap() {
  // Create the HTTP server for Swagger
  const app = await NestFactory.create(UserModule);
   // Create the microservice
  const microservice = app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: 'api-user',
      port: 3336,
    },
  });

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const options = new DocumentBuilder()
    .setTitle('API docs')
    .addTag('users')
    .addTag('tasks')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 3335;
  await app.startAllMicroservices();
  await app.listen(port);
  console.log(`HTTP server running on http://localhost:${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/docs`);
}
bootstrap();

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser'

async function bootstrap() {

  // TODO: Verificar la existencia de las claves

  const app = await NestFactory.create(AppModule);
  app.use(cookieParser())

  console.log(`Portal: ${process.env.PORTAL}`)
  app.enableCors({
    origin: process.env.PORTAL,
    credentials: true
  })

  const instance = app.getHttpAdapter().getInstance();
  instance.set('trust proxy', 1);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const config = new DocumentBuilder()
    .setTitle('Mauth API')
    .setDescription('Api to use the authorizator for Mauth accounts')
    .setVersion('0.0.1')
    .build()


  SwaggerModule.setup('api/docs', app, () => SwaggerModule.createDocument(app, config))

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();

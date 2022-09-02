import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.use(express.json({ limit: process.env.APP_FILE_MAX_SIZE }));
  app.use(
    express.urlencoded({
      limit: process.env.APP_FILE_MAX_SIZE,
      extended: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('PROYECT - API')
    .addBearerAuth()
    .setDescription(
      'Basado en principios REST, las APIs devuelve metadatos JSON.',
    )
    .setVersion('0.0.1')
    .setContact('Ing. Cristian Cueto Vargas', '', 'ccuetovargas65@gmail.com')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'Documentación',
    customfavIcon: 'https://nestjs.com/img/logo_text.svg',
    customCss: '.swagger-ui .topbar { display: none }',
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
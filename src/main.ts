import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';
import * as express from 'express'; // Importe o express

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração para servir arquivos estáticos na pasta 'public'
  app.use('/public', express.static('public'));

  // Configuração global de pipes e interceptors
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Aero Busca')
    .setDescription('API para busca de escolas de aviação')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Filtro global de exceções
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  // Inicialização do servidor
  await app.listen(3000);
}

bootstrap();

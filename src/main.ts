import {
  UnprocessableEntityException,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationError } from 'class-validator';

import { BaseErrorResponseDto } from './shared/dto/base-error-response.dto';
import { PaginatedResponseDto } from './shared/dto/paginated-response.dto';
import { HttpExceptionFilter } from './shared/middlewares/http-exception-filters';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const errorResponse = {
          message: 'Validation Error',
          data: errors.map((error) => ({
            field: error.property,
            constraints: error.constraints,
          })),
        };
        throw new UnprocessableEntityException(errorResponse);
      },
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  const config = new DocumentBuilder()
    .setTitle('WangKu API')
    .setDescription('WangKu API')
    .addBearerAuth()
    .addBasicAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [BaseErrorResponseDto, PaginatedResponseDto],
  });

  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();

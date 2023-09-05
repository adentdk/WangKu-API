import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import {
  UnprocessableEntityException,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { PaginatedResponseDto } from './shared/dto/paginated-response.dto';
import { HttpExceptionFilter } from './shared/middlewares/http-exception-filters';
import { BaseErrorResponseDto } from './shared/dto/base-error-response.dto';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const errorResponse = {
          message: 'Validation Error',
          fields: errors.map((error) => ({
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
  });

  const config = new DocumentBuilder()
    .setTitle('WangKu API')
    .setDescription('WangKu API')
    .setVersion('1.0')
    .addBearerAuth()
    .addBasicAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [BaseErrorResponseDto, PaginatedResponseDto],
  });

  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();

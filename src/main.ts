import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import {
  HttpStatus,
  UnprocessableEntityException,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ValidationErrorDto } from './__common/dto/validation-error';
import { PaginatedDto } from './__common/dto/paginated';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const errorResponse = {
          statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          message: 'Validation Error',
          error: 'Unprocessable Entity',
          errors: errors.map((error) => ({
            field: error.property,
            constraints: error.constraints,
          })),
        };
        throw new UnprocessableEntityException(errorResponse);
      },
    }),
  );

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
  });

  const config = new DocumentBuilder()
    .setTitle('WangKu API')
    .setDescription('WangKu API')
    .setVersion('1.0')
    .addSecurity('Basic', {
      type: 'http',
      scheme: 'basic',
    })
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [ValidationErrorDto, PaginatedDto],
  });

  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();

import { Get, Post, applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import {
  ApiInternalServerResponse,
  ApiValidationResponse,
} from 'src/__common/decorators/swagger';
import { ApiPaginatedResponse } from 'src/__common/decorators/swagger';
import { BaseTranslationDto } from '../dto/base-translation.dto';

export const CreateTranslationDecorators = () => {
  return applyDecorators(
    Post(),
    ApiCreatedResponse({
      description: 'success',
      type: BaseTranslationDto,
    }),
    ApiValidationResponse(),
    ApiInternalServerResponse(),
  );
};

export const ListTranslationDecorators = () => {
  return applyDecorators(
    Get(),
    ApiPaginatedResponse(BaseTranslationDto),
    ApiValidationResponse(),
    ApiInternalServerResponse(),
  );
};

export const TranslateDecorators = () => {
  return applyDecorators(
    Get('languages/:langCode/namespaces/:ns'),
    ApiInternalServerResponse(),
  );
};

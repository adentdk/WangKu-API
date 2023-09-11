import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiBadRequestResponse as SwaggerBadRequestResponse,
  ApiForbiddenResponse as SwaggerForbiddenResponse,
  ApiInternalServerErrorResponse as SwaggerInternalServerErrorResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse as SwaggerUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
  getSchemaPath,
} from '@nestjs/swagger';

import { ApiValidationErrorDto } from 'shared/dto/api-validation-error.dto';
import { BaseErrorResponseDto } from 'shared/dto/base-error-response.dto';
import { PaginatedResponseDto } from 'shared/dto/paginated-response.dto';

export const ApiPaginatedResponse = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginatedResponseDto) },
          {
            properties: {
              results: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
};

export const ApiValidationResponse = () => {
  return applyDecorators(
    ApiUnprocessableEntityResponse({ type: ApiValidationErrorDto }),
  );
};

export const ApiInternalServerErrorResponse = () => {
  return applyDecorators(
    SwaggerInternalServerErrorResponse({ type: BaseErrorResponseDto }),
  );
};

export const ApiBadRequestResponse = () => {
  return applyDecorators(
    SwaggerBadRequestResponse({ type: BaseErrorResponseDto }),
  );
};

export const ApiForbiddenResponse = () => {
  return applyDecorators(
    SwaggerForbiddenResponse({ type: BaseErrorResponseDto }),
  );
};

export const ApiUnauthorizedResponse = () => {
  return applyDecorators(
    SwaggerUnauthorizedResponse({ type: BaseErrorResponseDto }),
  );
};

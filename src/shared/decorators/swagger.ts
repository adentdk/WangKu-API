import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
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

export const ApiInternalServerResponse = () => {
  return applyDecorators(
    ApiInternalServerErrorResponse({ type: BaseErrorResponseDto }),
  );
};

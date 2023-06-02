import { Type, applyDecorators } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiUnprocessableEntityResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { PaginatedDto } from '../dto/paginated';
import { ValidationErrorDto } from '../dto/validation-error';

export const ApiPaginatedResponse = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginatedDto) },
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
    ApiUnprocessableEntityResponse({
      description: 'validation error',
      schema: { $ref: getSchemaPath(ValidationErrorDto) },
    }),
  );
};

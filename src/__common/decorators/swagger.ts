import { HttpStatus, Type, applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiResponse, getSchemaPath } from '@nestjs/swagger';
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
    ApiResponse({
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      description: 'validation error',
      schema: { $ref: getSchemaPath(ValidationErrorDto) },
    }),
  );
};

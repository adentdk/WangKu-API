import { Type, applyDecorators } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiUnprocessableEntityResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { PaginatedResponseDto } from '../dto/paginated-response.dto';
import { ApiValidationErrorDto } from '../dto/api-validation-error.dto';

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
    ApiUnprocessableEntityResponse({
      description: 'validation error',
      type: ApiValidationErrorDto,
    }),
  );
};

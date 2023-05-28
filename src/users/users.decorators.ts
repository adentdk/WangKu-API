import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { ApiValidationResponse } from 'src/__common/decorators/swagger';
import { BaseUserDto } from './dto/base-user';
import { ApiPaginatedResponse } from 'src/__common/decorators/swagger';
import { BaseErrorDto } from 'src/__common/dto/base-error';

export const CreateUserDecorator = () => {
  return applyDecorators(
    ApiCreatedResponse({
      description: 'success',
      type: BaseUserDto,
    }),
    ApiValidationResponse(),
    ApiInternalServerErrorResponse({ type: BaseErrorDto }),
  );
};

export const ListUserDecorator = () => {
  return applyDecorators(
    ApiPaginatedResponse(BaseUserDto),
    ApiValidationResponse(),
    ApiInternalServerErrorResponse({ type: BaseErrorDto }),
  );
};

export const DetailUserDecorator = () => {
  return applyDecorators(
    ApiOkResponse({ type: BaseUserDto }),
    ApiValidationResponse(),
    ApiInternalServerErrorResponse({ type: BaseErrorDto }),
    ApiBadRequestResponse({ type: BaseErrorDto }),
  );
};

import { applyDecorators } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { ApiValidationResponse } from 'src/__common/decorators/swagger';
import { BaseUserDto } from './dto/base-user';
import { ApiPaginatedResponse } from 'src/__common/decorators/swagger';

export const CreateUserResponse = () => {
  return applyDecorators(
    ApiCreatedResponse({
      description: 'success',
      type: BaseUserDto,
    }),
    ApiValidationResponse(),
    ApiInternalServerErrorResponse(),
  );
};

export const ListUserResponse = () => {
  return applyDecorators(
    ApiPaginatedResponse(BaseUserDto),
    ApiValidationResponse(),
    ApiInternalServerErrorResponse(),
  );
};

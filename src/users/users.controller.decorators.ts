import {
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  applyDecorators,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { ApiValidationResponse } from 'src/__common/decorators/swagger';
import { ApiPaginatedResponse } from 'src/__common/decorators/swagger';
import { BaseErrorResponseDto } from 'src/__common/dto/base-error-response.dto';
import { BaseUserDto } from './dto/base-user.dto';

export const CreateUserDecorators = () => {
  return applyDecorators(
    Post(),
    ApiCreatedResponse({
      description: 'success',
      type: BaseUserDto,
    }),
    ApiValidationResponse(),
    ApiInternalServerErrorResponse({ type: BaseErrorResponseDto }),
  );
};

export const ListUserDecorators = () => {
  return applyDecorators(
    Get(),
    ApiPaginatedResponse(BaseUserDto),
    ApiValidationResponse(),
    ApiInternalServerErrorResponse({ type: BaseErrorResponseDto }),
  );
};

export const DetailUserDecorators = () => {
  return applyDecorators(
    Get(':id'),
    ApiOkResponse({ type: BaseUserDto }),
    ApiValidationResponse(),
    ApiInternalServerErrorResponse({ type: BaseErrorResponseDto }),
    ApiBadRequestResponse({ type: BaseErrorResponseDto }),
  );
};

export const UpdateUserDecorators = () => {
  return applyDecorators(
    Patch(':id'),
    ApiOkResponse({ type: BaseUserDto }),
    ApiValidationResponse(),
    ApiInternalServerErrorResponse({ type: BaseErrorResponseDto }),
    ApiBadRequestResponse({ type: BaseErrorResponseDto }),
  );
};

export const RemoveUserDecorators = () => {
  return applyDecorators(
    HttpCode(HttpStatus.NO_CONTENT),
    Delete(':id'),
    ApiNoContentResponse({ description: 'success' }),
    ApiValidationResponse(),
    ApiInternalServerErrorResponse({ type: BaseErrorResponseDto }),
    ApiBadRequestResponse({ type: BaseErrorResponseDto }),
  );
};

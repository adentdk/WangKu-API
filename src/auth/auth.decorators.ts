import { Post, applyDecorators } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiOkResponse } from '@nestjs/swagger';
import { SignInSuccessDto } from './dto/sign-in-success';
import { ApiValidationResponse } from 'src/__common/decorators/swagger';
import { BaseErrorDto } from 'src/__common/dto/base-error';

export const SignInDecorators = () => {
  return applyDecorators(
    Post('sign-in'),
    ApiOkResponse({
      description: 'success',
      type: SignInSuccessDto,
    }),
    ApiValidationResponse(),
    ApiInternalServerErrorResponse({ type: BaseErrorDto }),
  );
};

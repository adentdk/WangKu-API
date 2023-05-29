import {
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  applyDecorators,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiValidationResponse } from 'src/__common/decorators/swagger';
import { BaseProfileDto } from 'src/users/dto/base-profile';
import { SignInSuccessDto } from '../dto/sign-in-success';
import { JwtAuthGuard } from '../guards/jwt-auth';
import { LocalAuthGuard } from '../guards/local-auth';
import { SignInDto } from '../dto/sign-in';

export const SignInDecorators = () => {
  return applyDecorators(
    HttpCode(HttpStatus.OK),
    UseGuards(LocalAuthGuard),
    Post('sign-in'),
    ApiBody({ type: SignInDto }),
    ApiOkResponse({
      description: 'success',
      type: SignInSuccessDto,
    }),
    ApiValidationResponse(),
    ApiInternalServerErrorResponse(),
  );
};

export const AuthProfileDecorators = () => {
  return applyDecorators(
    UseGuards(JwtAuthGuard),
    Get('profile'),
    ApiOkResponse({
      description: 'success',
      type: BaseProfileDto,
    }),
    ApiBearerAuth(),
    ApiUnauthorizedResponse(),
    ApiInternalServerErrorResponse(),
  );
};

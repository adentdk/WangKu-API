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
import { JwtAuthGuard } from 'src/__common/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/__common/guards/local-auth.guard';
import { BaseProfileDto } from 'src/users/dto/base-profile.dto';
import { SignInDto } from './dto/sign-in.dto';
import { TokensDto } from './dto/tokens.dto';

export const SignInDecorators = () => {
  return applyDecorators(
    Post('signin'),
    HttpCode(HttpStatus.OK),
    ApiBody({ type: SignInDto }),
    UseGuards(LocalAuthGuard),
    ApiOkResponse({
      description: 'success',
      type: TokensDto,
    }),
    ApiValidationResponse(),
    ApiInternalServerErrorResponse(),
  );
};

export const AuthProfileDecorators = () => {
  return applyDecorators(
    Get('profile'),
    UseGuards(JwtAuthGuard),
    ApiOkResponse({
      description: 'success',
      type: BaseProfileDto,
    }),
    ApiBearerAuth(),
    ApiUnauthorizedResponse(),
    ApiInternalServerErrorResponse(),
  );
};

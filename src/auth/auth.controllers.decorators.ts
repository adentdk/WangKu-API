import {
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  applyDecorators,
} from '@nestjs/common';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiValidationResponse } from 'src/__common/decorators/swagger';
import { LocalAuthGuard } from 'src/__common/guards/local-auth.guard';
import { BaseProfileDto } from 'src/users/dto/base-profile.dto';
import { SignInDto } from './dto/sign-in.dto';
import { TokensDto } from './dto/tokens.dto';
import { JwtBasicAuthGuard } from 'src/__common/guards/jwt-basic-auth.guard';

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
    UseGuards(JwtBasicAuthGuard),
    Get('profile'),
    ApiOkResponse({
      description: 'success',
      type: BaseProfileDto,
    }),
    ApiBearerAuth(),
    ApiBasicAuth(),
    ApiUnauthorizedResponse(),
    ApiInternalServerErrorResponse(),
  );
};

import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBasicAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
  ApiValidationResponse,
} from 'shared/decorators/swagger';
import { BadRequest } from 'shared/exceptions/bad-request';
import { BasicAuthGuard } from 'shared/guards/basic-auth.guard';

import { UserService } from 'modules/users/users.service';

import { SignInDto } from './dto/sign-in.dto';
import { TokensDto } from './dto/tokens.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('auth')
@ApiForbiddenResponse()
@ApiBadRequestResponse()
@ApiUnauthorizedResponse()
@ApiValidationResponse()
@ApiInternalServerErrorResponse()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @UseGuards(BasicAuthGuard)
  @ApiBasicAuth()
  @ApiOkResponse({ type: TokensDto })
  async signIn(@Body() body: SignInDto) {
    const user = await this.userService.checkUsernamePassword(
      body.username,
      body.password,
    );
    if (!user) throw new BadRequest();
    return this.authService.getTokens(user.getAuthObject());
  }
}

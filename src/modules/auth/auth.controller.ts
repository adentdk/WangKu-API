import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AuthUser } from 'shared/decorators/auth-user';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
  ApiValidationResponse,
} from 'shared/decorators/swagger';
import { AuthUserDto } from 'shared/dto/auth-user.dto';
import { BadRequest } from 'shared/exceptions/bad-request';
import { BasicAuthGuard } from 'shared/guards/basic-auth.guard';
import { JwtAuthGuard } from 'shared/guards/jwt-auth.guard';

import { BaseProfileDto } from 'modules/profiles/dto/base-profile.dto';
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

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: BaseProfileDto })
  async profile(@AuthUser() authUser: AuthUserDto) {
    return this.userService.findProfile(authUser.userId);
  }
}

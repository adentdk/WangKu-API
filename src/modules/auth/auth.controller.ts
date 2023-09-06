import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthUser } from 'shared/decorators/auth-user';
import { AuthUserDto } from 'shared/dto/auth-user.dto';

import { UserService } from 'modules/users/users.service';

import { TokensDto } from './dto/tokens.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'shared/guards/jwt-auth.guard';
import { BaseProfileDto } from 'modules/profiles/dto/base-profile.dto';
import { SignInDto } from './dto/sign-in.dto';
import { LocalAuthGuard } from 'shared/guards/local-auth.guard';
import { ApiValidationResponse } from 'shared/decorators/swagger';

@Controller('auth')
@ApiTags('auth')
@ApiExtraModels(TokensDto)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: SignInDto })
  @UseGuards(LocalAuthGuard)
  @ApiOkResponse({
    description: 'success',
    type: TokensDto,
  })
  @ApiValidationResponse()
  @ApiInternalServerErrorResponse()
  async signIn(@AuthUser() authUser: AuthUserDto) {
    return this.authService.getTokens(authUser);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'success', type: BaseProfileDto })
  @ApiUnauthorizedResponse()
  @ApiInternalServerErrorResponse()
  async profile(@AuthUser() authUser: AuthUserDto) {
    return this.userService.findProfile(authUser.userId);
  }
}

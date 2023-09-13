import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AuthUser } from 'shared/decorators/auth-user';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
  ApiValidationResponse,
} from 'shared/decorators/swagger';
import { AuthUserDto } from 'shared/dto/auth-user.dto';
import { JwtAuthGuard } from 'shared/guards/jwt-auth.guard';

import { BaseProfileDto } from 'modules/profiles/dto/base-profile.dto';
import { UserService } from 'modules/users/users.service';

@Controller('auth')
@ApiTags('auth')
@ApiForbiddenResponse()
@ApiBadRequestResponse()
@ApiUnauthorizedResponse()
@ApiValidationResponse()
@ApiInternalServerErrorResponse()
export class AuthProfileController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: BaseProfileDto })
  async profile(@AuthUser() authUser: AuthUserDto) {
    return this.userService.findProfile(authUser.userId);
  }
}

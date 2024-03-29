import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AuthUser } from 'shared/decorators/auth-user';
import { CheckPolicies } from 'shared/decorators/policies';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
  ApiValidationResponse,
} from 'shared/decorators/swagger';
import { AuthUserDto } from 'shared/dto/auth-user.dto';
import { JwtAuthGuard } from 'shared/guards/jwt-auth.guard';
import { PoliciesGuard } from 'shared/guards/policies.guard';

import { BaseProfileDto } from 'modules/profiles/dto/base-profile.dto';
import { UpdateProfileDto } from 'modules/profiles/dto/update-profile.dto';
import { ProfilesService } from 'modules/profiles/profiles.service';

@Controller('auth')
@ApiTags('auth-profile')
@ApiForbiddenResponse()
@ApiBadRequestResponse()
@ApiUnauthorizedResponse()
@ApiValidationResponse()
@ApiInternalServerErrorResponse()
export class AuthProfileController {
  constructor(private readonly profileService: ProfilesService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability) => ability.can('detail', 'Profile'))
  @ApiBearerAuth()
  @ApiOkResponse({ type: BaseProfileDto })
  async getProfile(@AuthUser() authUser: AuthUserDto) {
    const profile = await this.profileService.findProfileByUserId(
      authUser.userId,
    );
    return profile.toJSON();
  }

  @Patch('profile')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability) => ability.can('update', 'Profile'))
  @ApiBearerAuth()
  @ApiOkResponse({ type: BaseProfileDto })
  async updateProfile(
    @AuthUser() authUser: AuthUserDto,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    const profile = await this.profileService.updateProfileByUserId(
      authUser.userId,
      updateProfileDto,
      authUser.userId,
    );
    return profile.toJSON();
  }
}

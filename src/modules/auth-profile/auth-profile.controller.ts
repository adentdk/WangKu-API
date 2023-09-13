import { Controller, Get, UseGuards } from '@nestjs/common';
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

import { CaslAbilityFactory } from 'modules/casl/casl-ability.factory';
import { BaseProfileDto } from 'modules/profiles/dto/base-profile.dto';
import { ProfilesService } from 'modules/profiles/profiles.service';

@Controller('auth')
@ApiTags('auth-profile')
@ApiForbiddenResponse()
@ApiBadRequestResponse()
@ApiUnauthorizedResponse()
@ApiValidationResponse()
@ApiInternalServerErrorResponse()
export class AuthProfileController {
  constructor(
    private readonly profileService: ProfilesService,
    private readonly caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability) => ability.can('detail', 'Profile'))
  @ApiBearerAuth()
  @ApiOkResponse({ type: BaseProfileDto })
  async profile(@AuthUser() authUser: AuthUserDto) {
    const ability = await this.caslAbilityFactory.createForUser(
      authUser.userId,
    );

    const profile = await this.profileService.findProfileByUserId(
      authUser.userId,
    );

    console.log(ability.can('manage', profile));

    return profile;
  }
}

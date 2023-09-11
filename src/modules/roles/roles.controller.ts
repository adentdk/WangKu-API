import { AnyAbility } from '@casl/ability';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AuthUser } from 'shared/decorators/auth-user';
import { CheckPolicies } from 'shared/decorators/policies';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiPaginatedResponse,
  ApiUnauthorizedResponse,
  ApiValidationResponse,
} from 'shared/decorators/swagger';
import { AuthUserDto } from 'shared/dto/auth-user.dto';
import { JwtAuthGuard } from 'shared/guards/jwt-auth.guard';
import { PoliciesGuard } from 'shared/guards/policies.guard';

import { BaseRoleDto } from './dto/base-role.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { ListRoleParamsDto } from './dto/list-role-params.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesService } from './roles.service';

@Controller('roles')
@ApiTags('roles')
@ApiValidationResponse()
@ApiUnauthorizedResponse()
@ApiBadRequestResponse()
@ApiInternalServerErrorResponse()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ type: BaseRoleDto })
  create(
    @Body() createRoleDto: CreateRoleDto,
    @AuthUser() authUser: AuthUserDto,
  ) {
    return this.rolesService.create(createRoleDto, authUser.userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AnyAbility) => ability.can('manage', 'User'))
  @ApiPaginatedResponse(BaseRoleDto)
  async findAll(@Query() queryParams: ListRoleParamsDto) {
    return this.rolesService.findAll(queryParams);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: BaseRoleDto })
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: BaseRoleDto })
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}

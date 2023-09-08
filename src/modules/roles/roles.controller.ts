import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AuthUser } from 'shared/decorators/auth-user';
import {
  ApiPaginatedResponse,
  ApiValidationResponse,
} from 'shared/decorators/swagger';
import { AuthUserDto } from 'shared/dto/auth-user.dto';
import { BaseErrorResponseDto } from 'shared/dto/base-error-response.dto';
import { JwtAuthGuard } from 'shared/guards/jwt-auth.guard';

import { BaseRoleDto } from './dto/base-role.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { ListRoleParamsDto } from './dto/list-role-params.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesService } from './roles.service';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ type: BaseRoleDto })
  @ApiValidationResponse()
  @ApiInternalServerErrorResponse({ type: BaseErrorResponseDto })
  create(
    @Body() createRoleDto: CreateRoleDto,
    @AuthUser() authUser: AuthUserDto,
  ) {
    return this.rolesService.create(createRoleDto, authUser.userId);
  }

  @Get()
  @ApiPaginatedResponse(BaseRoleDto)
  @ApiValidationResponse()
  @ApiInternalServerErrorResponse({ type: BaseErrorResponseDto })
  findAll(@Query() queryParams: ListRoleParamsDto) {
    return this.rolesService.findAll(queryParams);
  }

  @Get(':id')
  @ApiOkResponse({ type: BaseRoleDto })
  @ApiValidationResponse()
  @ApiInternalServerErrorResponse({ type: BaseErrorResponseDto })
  @ApiBadRequestResponse({ type: BaseErrorResponseDto })
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}

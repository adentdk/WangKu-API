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
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiPaginatedResponse,
  ApiUnauthorizedResponse,
  ApiValidationResponse,
} from 'shared/decorators/swagger';
import { AuthUserDto } from 'shared/dto/auth-user.dto';
import { JwtAuthGuard } from 'shared/guards/jwt-auth.guard';

import { BaseRoleDto } from './dto/base-role.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { ListRoleParamsDto } from './dto/list-role-params.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesService } from './roles.service';

@Controller('roles')
@UseGuards(JwtAuthGuard)
@ApiTags('roles')
@ApiValidationResponse()
@ApiUnauthorizedResponse()
@ApiBadRequestResponse()
@ApiInternalServerErrorResponse()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiCreatedResponse({ type: BaseRoleDto })
  create(
    @Body() createRoleDto: CreateRoleDto,
    @AuthUser() authUser: AuthUserDto,
  ) {
    return this.rolesService.create(createRoleDto, authUser.userId);
  }

  @Get()
  @ApiPaginatedResponse(BaseRoleDto)
  findAll(@Query() queryParams: ListRoleParamsDto) {
    return this.rolesService.findAll(queryParams);
  }

  @Get(':id')
  @ApiOkResponse({ type: BaseRoleDto })
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: BaseRoleDto })
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}

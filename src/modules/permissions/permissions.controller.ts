import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
  ApiValidationResponse,
} from 'shared/decorators/swagger';

import { CreatePermissionDto } from './dto/create-permission.dto';
import { ListPermissionParamsDto } from './dto/list-permission-params.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionService } from './permissions.service';

@ApiTags('permissions')
@Controller('permissions')
@ApiForbiddenResponse()
@ApiUnauthorizedResponse()
@ApiBadRequestResponse()
@ApiInternalServerErrorResponse()
@ApiValidationResponse()
export class PermissionsController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  @ApiBearerAuth()
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.create(createPermissionDto);
  }

  @Get()
  @ApiBearerAuth()
  findAll(@Query() queryParams: ListPermissionParamsDto) {
    return this.permissionService.findAll(queryParams);
  }

  @Get(':id')
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.permissionService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return this.permissionService.update(+id, updatePermissionDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.permissionService.remove(+id);
  }
}

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
import { ApiTags } from '@nestjs/swagger';

import {
  ApiBadRequestResponse,
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
@ApiUnauthorizedResponse()
@ApiBadRequestResponse()
@ApiInternalServerErrorResponse()
@ApiValidationResponse()
export class PermissionsController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.create(createPermissionDto);
  }

  @Get()
  findAll(@Query() queryParams: ListPermissionParamsDto) {
    return this.permissionService.findAll(queryParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return this.permissionService.update(+id, updatePermissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionService.remove(+id);
  }
}

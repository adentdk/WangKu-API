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
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiPaginatedResponse,
  ApiUnauthorizedResponse,
  ApiValidationResponse,
} from 'shared/decorators/swagger';

import { AddRoleUserDto } from './dto/add-role-user.dto';
import { BaseUserDto } from './dto/base-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ListUserParamsDto } from './dto/list-user-params.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './users.service';

@ApiTags('users')
@Controller('users')
@ApiValidationResponse()
@ApiInternalServerErrorResponse()
@ApiBadRequestResponse()
@ApiUnauthorizedResponse()
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({ type: BaseUserDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiPaginatedResponse(BaseUserDto)
  findAll(@Query() listParams: ListUserParamsDto) {
    return this.userService.findAll(listParams);
  }

  @Get(':id')
  @ApiOkResponse({ type: BaseUserDto })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: BaseUserDto })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Post(':id/roles')
  addRoleUser(@Param('id') id: string, @Body() addUserDto: AddRoleUserDto) {
    return this.userService.addRoleUser(id, addUserDto);
  }
}

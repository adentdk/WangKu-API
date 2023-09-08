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
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import {
  ApiPaginatedResponse,
  ApiValidationResponse,
} from 'shared/decorators/swagger';
import { BaseErrorResponseDto } from 'shared/dto/base-error-response.dto';

import { AddRoleUserDto } from './dto/add-role-user.dto';
import { BaseUserDto } from './dto/base-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ListUserParamsDto } from './dto/list-user-params.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({ type: BaseUserDto })
  @ApiValidationResponse()
  @ApiInternalServerErrorResponse({ type: BaseErrorResponseDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiPaginatedResponse(BaseUserDto)
  @ApiValidationResponse()
  @ApiInternalServerErrorResponse({ type: BaseErrorResponseDto })
  findAll(@Query() listParams: ListUserParamsDto) {
    return this.userService.findAll(listParams);
  }

  @Get(':id')
  @ApiOkResponse({ type: BaseUserDto })
  @ApiValidationResponse()
  @ApiInternalServerErrorResponse({ type: BaseErrorResponseDto })
  @ApiBadRequestResponse({ type: BaseErrorResponseDto })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: BaseUserDto })
  @ApiValidationResponse()
  @ApiInternalServerErrorResponse({ type: BaseErrorResponseDto })
  @ApiBadRequestResponse({ type: BaseErrorResponseDto })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @ApiValidationResponse()
  @ApiInternalServerErrorResponse({ type: BaseErrorResponseDto })
  @ApiBadRequestResponse({ type: BaseErrorResponseDto })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Post(':id/roles')
  addRoleUser(@Param('id') id: string, @Body() addUserDto: AddRoleUserDto) {
    return this.userService.addRoleUser(id, addUserDto);
  }
}

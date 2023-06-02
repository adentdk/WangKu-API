import { Controller, Body, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { BaseUserDto } from './dto/base-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import {
  CreateUserDecorators,
  RemoveUserDecorators,
  DetailUserDecorators,
  ListUserDecorators,
  UpdateUserDecorators,
} from './users.controller.decorators';
import { ListUserParamsDto } from './dto/list-user.dto';

@ApiTags('users')
@Controller('users')
@ApiExtraModels(BaseUserDto)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @CreateUserDecorators()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ListUserDecorators()
  findAll(@Query() listParams: ListUserParamsDto) {
    return this.usersService.findAll(listParams);
  }

  @DetailUserDecorators()
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @UpdateUserDecorators()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @RemoveUserDecorators()
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}

import { Controller, Body, Param, Query, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateUserDecorators,
  RemoveUserDecorators,
  DetailUserDecorators,
  ListUserDecorators,
  UpdateUserDecorators,
} from '../users.controller.decorators';
import { UserService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ListUserParamsDto } from '../dto/list-user-params.dto';
import { AddRoleUserDto } from '../dto/add-role-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly UserService: UserService) {}

  @CreateUserDecorators()
  create(@Body() createUserDto: CreateUserDto) {
    return this.UserService.create(createUserDto);
  }

  @ListUserDecorators()
  findAll(@Query() listParams: ListUserParamsDto) {
    return this.UserService.findAll(listParams);
  }

  @DetailUserDecorators()
  findOne(@Param('id') id: string) {
    return this.UserService.findOne(id);
  }

  @UpdateUserDecorators()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.UserService.update(id, updateUserDto);
  }

  @RemoveUserDecorators()
  remove(@Param('id') id: string) {
    return this.UserService.remove(id);
  }

  @Post(':id/roles')
  addRoleUser(@Param('id') id: string, @Body() addUserDto: AddRoleUserDto) {
    return this.UserService.addRoleUser(id, addUserDto);
  }
}

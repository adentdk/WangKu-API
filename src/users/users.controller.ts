import { Controller, Body, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateUserDecorators,
  RemoveUserDecorators,
  DetailUserDecorators,
  ListUserDecorators,
  UpdateUserDecorators,
} from './users.controller.decorators';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ListUserParamsDto } from './dto/list-user-params.dto';

@ApiTags('users')
@Controller('users')
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

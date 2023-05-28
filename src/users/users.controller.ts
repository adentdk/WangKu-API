import {
  Controller,
  Body,
  Param,
  Query,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { BaseUserDto } from './dto/base-user';
import { CreateUserDto } from './dto/create-user';
import { UpdateUserDto } from './dto/update-user';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import {
  CreateUserDecorators,
  RemoveUserDecorators,
  DetailUserDecorators,
  ListUserDecorators,
  UpdateUserDecorators,
} from './users.decorators';
import { ListUserParamsDto } from './dto/list-user';
import { Response } from 'express';

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
  remove(@Param('id') id: string, @Res() res: Response) {
    return this.usersService.remove(id, res);
  }
}

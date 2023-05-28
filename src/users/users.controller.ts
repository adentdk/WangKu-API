import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { BaseUserDto } from './dto/base-user';
import { CreateUserDto } from './dto/create-user';
import { UpdateUserDto } from './dto/update-user';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import {
  CreateUserDecorator,
  DetailUserDecorator,
  ListUserDecorator,
} from './users.decorators';
import { ListUserParamsDto } from './dto/list-user';

@ApiTags('users')
@Controller('users')
@ApiExtraModels(BaseUserDto)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @CreateUserDecorator()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ListUserDecorator()
  findAll(@Query() listParams: ListUserParamsDto) {
    return this.usersService.findAll(listParams);
  }

  @Get(':id')
  @DetailUserDecorator()
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}

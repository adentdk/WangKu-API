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
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AuthUser } from 'shared/decorators/auth-user';
import { CheckPolicies } from 'shared/decorators/policies';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiPaginatedResponse,
  ApiUnauthorizedResponse,
  ApiValidationResponse,
} from 'shared/decorators/swagger';
import { AuthUserDto } from 'shared/dto/auth-user.dto';
import { JwtAuthGuard } from 'shared/guards/jwt-auth.guard';
import { PoliciesGuard } from 'shared/guards/policies.guard';

import { BaseMenu } from './dto/base-menu.dto';
import { CreateMenuDto } from './dto/create-menu.dto';
import { ListMenuParams } from './dto/list-menu-params.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenusService } from './menus.service';

@Controller('menus')
@ApiTags('menus')
@ApiForbiddenResponse()
@ApiValidationResponse()
@ApiUnauthorizedResponse()
@ApiBadRequestResponse()
@ApiInternalServerErrorResponse()
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Post()
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability) => ability.can('create', 'Menu'))
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: BaseMenu })
  create(
    @Body()
    createMenuDto: CreateMenuDto,
    @AuthUser() authUser: AuthUserDto,
  ) {
    return this.menusService.create(createMenuDto, authUser.userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability) => ability.can('list', 'Menu'))
  @ApiBearerAuth()
  @ApiPaginatedResponse(BaseMenu)
  findAll(@Query() queryParams: ListMenuParams) {
    return this.menusService.findAll(queryParams);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability) => ability.can('detail', 'Menu'))
  @ApiBearerAuth()
  @ApiOkResponse({ type: BaseMenu })
  findOne(@Param('id') id: string) {
    return this.menusService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability) => ability.can('update', 'Menu'))
  @ApiBearerAuth()
  @ApiOkResponse({ type: BaseMenu })
  update(
    @Param('id') id: string,
    @Body()
    updateMenuDto: UpdateMenuDto,
    @AuthUser() authUser: AuthUserDto,
  ) {
    return this.menusService.update(id, updateMenuDto, authUser.userId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability) => ability.can('delete', 'Menu'))
  @ApiBearerAuth()
  @ApiNoContentResponse()
  async delete(@Param('id') id: string, @AuthUser() authUser: AuthUserDto) {
    await this.menusService.delete(id, authUser.userId);
    return;
  }
}

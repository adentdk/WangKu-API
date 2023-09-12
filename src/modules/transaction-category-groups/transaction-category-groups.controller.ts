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

import { BaseTransactionCategoryGroup } from './dto/base-transaction-category-group.dto';
import { CreateTransactionCategoryGroupDto } from './dto/create-transaction-category-group.dto';
import { ListTransactionCategoryGroupParams } from './dto/list-transaction-category-group-params.dto';
import { UpdateTransactionCategoryGroupDto } from './dto/update-transaction-category-group.dto';
import { TransactionCategoryGroupsService } from './transaction-category-groups.service';

@Controller('transaction-category-groups')
@ApiTags('transaction-category-groups')
@ApiForbiddenResponse()
@ApiValidationResponse()
@ApiUnauthorizedResponse()
@ApiBadRequestResponse()
@ApiInternalServerErrorResponse()
export class TransactionCategoryGroupsController {
  constructor(
    private readonly transactionCategoryGroups: TransactionCategoryGroupsService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability) => ability.can('create', 'TransactionCategoryGroup'))
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: BaseTransactionCategoryGroup })
  create(
    @Body()
    createTransactionCategoryGroupDto: CreateTransactionCategoryGroupDto,
    @AuthUser() authUser: AuthUserDto,
  ) {
    return this.transactionCategoryGroups.create(
      createTransactionCategoryGroupDto,
      authUser.userId,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability) => ability.can('list', 'TransactionCategoryGroup'))
  @ApiBearerAuth()
  @ApiPaginatedResponse(BaseTransactionCategoryGroup)
  findAll(@Query() queryParams: ListTransactionCategoryGroupParams) {
    return this.transactionCategoryGroups.findAll(queryParams);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability) => ability.can('detail', 'TransactionCategoryGroup'))
  @ApiBearerAuth()
  @ApiOkResponse({ type: BaseTransactionCategoryGroup })
  findOne(@Param('id') id: string) {
    return this.transactionCategoryGroups.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability) => ability.can('update', 'TransactionCategoryGroup'))
  @ApiBearerAuth()
  @ApiOkResponse({ type: BaseTransactionCategoryGroup })
  update(
    @Param('id') id: string,
    @Body()
    updateTransactionCategoryGroupDto: UpdateTransactionCategoryGroupDto,
    @AuthUser() authUser: AuthUserDto,
  ) {
    return this.transactionCategoryGroups.update(
      id,
      updateTransactionCategoryGroupDto,
      authUser.userId,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability) => ability.can('delete', 'TransactionCategoryGroup'))
  @ApiBearerAuth()
  @ApiNoContentResponse()
  async delete(@Param('id') id: string, @AuthUser() authUser: AuthUserDto) {
    await this.transactionCategoryGroups.delete(id, authUser.userId);
    return;
  }
}

import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

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
import { CreateTransactionCategoruGroup } from './dto/create-transaction-category-group.dto';
import { ListTransactionCategoryGroupParams } from './dto/list-transaction-category-group-params.dto';
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
    @Body() createTransactionCategoryGroupDto: CreateTransactionCategoruGroup,
    @AuthUser() authUser: AuthUserDto,
  ) {
    return this.transactionCategoryGroups.create(
      createTransactionCategoryGroupDto,
      authUser.userId,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @CheckPolicies((ability) => ability.can('list', 'TransactionCategoryGroup'))
  @ApiBearerAuth()
  @ApiPaginatedResponse(BaseTransactionCategoryGroup)
  async findAll(@Query() queryParams: ListTransactionCategoryGroupParams) {
    return this.transactionCategoryGroups.findAll(queryParams);
  }
}

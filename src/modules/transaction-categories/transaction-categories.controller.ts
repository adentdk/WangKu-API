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

import { BaseTransactionCategory } from './dto/base-transaction-category.dto';
import { CreateTransactionCategoryDto } from './dto/create-transaction-category.dto';
import { ListTransactionCategoryParams } from './dto/list-transaction-category-params.dto';
import { UpdateTransactionCategoryDto } from './dto/update-transaction-category.dto';
import { TransactionCategoriesService } from './transaction-categories.service';

@Controller('transaction-categories')
@ApiTags('transaction-categories')
@ApiForbiddenResponse()
@ApiValidationResponse()
@ApiUnauthorizedResponse()
@ApiBadRequestResponse()
@ApiInternalServerErrorResponse()
export class TransactionCategoriesController {
  constructor(
    private readonly transactionCategories: TransactionCategoriesService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability) => ability.can('create', 'TransactionCategory'))
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: BaseTransactionCategory })
  create(
    @Body()
    createTransactionCategoryDto: CreateTransactionCategoryDto,
    @AuthUser() authUser: AuthUserDto,
  ) {
    return this.transactionCategories.create(
      createTransactionCategoryDto,
      authUser.userId,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability) => ability.can('list', 'TransactionCategory'))
  @ApiBearerAuth()
  @ApiPaginatedResponse(BaseTransactionCategory)
  findAll(@Query() queryParams: ListTransactionCategoryParams) {
    return this.transactionCategories.findAll(queryParams);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability) => ability.can('detail', 'TransactionCategory'))
  @ApiBearerAuth()
  @ApiOkResponse({ type: BaseTransactionCategory })
  findOne(@Param('id') id: string) {
    return this.transactionCategories.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability) => ability.can('update', 'TransactionCategory'))
  @ApiBearerAuth()
  @ApiOkResponse({ type: BaseTransactionCategory })
  update(
    @Param('id') id: string,
    @Body()
    updateTransactionCategoryDto: UpdateTransactionCategoryDto,
    @AuthUser() authUser: AuthUserDto,
  ) {
    return this.transactionCategories.update(
      id,
      updateTransactionCategoryDto,
      authUser.userId,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability) => ability.can('delete', 'TransactionCategory'))
  @ApiBearerAuth()
  @ApiNoContentResponse()
  async delete(@Param('id') id: string, @AuthUser() authUser: AuthUserDto) {
    await this.transactionCategories.delete(id, authUser.userId);
    return;
  }
}

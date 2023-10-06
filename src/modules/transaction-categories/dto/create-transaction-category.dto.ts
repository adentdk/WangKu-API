import { PickType } from '@nestjs/swagger';

import { BaseTransactionCategory } from './base-transaction-category.dto';

export class CreateTransactionCategoryDto extends PickType(
  BaseTransactionCategory,
  [
    'name',
    'type',
    'description',
    'icon',
    'iconType',
    'userId',
    'tNameKey',
    'tDescKey',
    'transactionCategoryGroupId',
  ],
) {}

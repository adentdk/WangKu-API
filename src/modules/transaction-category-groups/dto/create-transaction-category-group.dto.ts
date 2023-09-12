import { PickType } from '@nestjs/swagger';

import { BaseTransactionCategoryGroup } from './base-transaction-category-group.dto';

export class CreateTransactionCategoruGroup extends PickType(
  BaseTransactionCategoryGroup,
  ['name', 'type', 'description', 'icon', 'iconType', 'userId'],
) {}

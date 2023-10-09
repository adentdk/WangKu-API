import { PickType } from '@nestjs/swagger';

import { BaseTransactionCategoryGroup } from './base-transaction-category-group.dto';

export class CreateTransactionCategoryGroupDto extends PickType(
  BaseTransactionCategoryGroup,
  ['name', 'description', 'icon', 'iconType', 'userId'],
) {}

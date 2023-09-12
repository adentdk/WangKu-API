import { PartialType } from '@nestjs/swagger';

import { CreateTransactionCategoryGroupDto } from './create-transaction-category-group.dto';

export class UpdateTransactionCategoryGroupDto extends PartialType(
  CreateTransactionCategoryGroupDto,
) {}

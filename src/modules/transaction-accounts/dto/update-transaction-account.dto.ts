import { PartialType } from '@nestjs/swagger';

import { CreateTransactionAccountDto } from './create-transaction-account.dto';

export class UpdateTransactionAccountDto extends PartialType(
  CreateTransactionAccountDto,
) {}

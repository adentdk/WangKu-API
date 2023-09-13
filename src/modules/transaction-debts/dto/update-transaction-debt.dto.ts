import { PartialType } from '@nestjs/swagger';

import { CreateTransactionDebtDto } from './create-transaction-debt.dto';

export class UpdateTransactionDebtDto extends PartialType(
  CreateTransactionDebtDto,
) {}

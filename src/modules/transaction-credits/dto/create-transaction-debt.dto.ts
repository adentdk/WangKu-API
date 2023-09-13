import { PickType } from '@nestjs/swagger';

import { BaseTransactionDebt } from './base-transaction-debt.dto';

export class CreateTransactionDebtDto extends PickType(BaseTransactionDebt, [
  'currencyCode',
  'date',
  'amount',
  'description',
  'debtor',
  'userId',
  'categoryId',
]) {}

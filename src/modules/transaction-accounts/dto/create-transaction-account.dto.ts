import { PickType } from '@nestjs/swagger';

import { BaseTransactionAccount } from './base-transaction-account.dto';

export class CreateTransactionAccountDto extends PickType(
  BaseTransactionAccount,
  [
    'name',
    'type',
    'icon',
    'iconType',
    'userId',
    'currencyCode',
    'currentBalance',
    'default',
  ],
) {}

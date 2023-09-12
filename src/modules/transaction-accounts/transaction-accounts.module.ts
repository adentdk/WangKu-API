import { Module } from '@nestjs/common';

import { TransactionAccountsController } from './transaction-accounts.controller';
import { TransactionAccountsService } from './transaction-accounts.service';

@Module({
  providers: [TransactionAccountsService],
  controllers: [TransactionAccountsController],
})
export class TransactionAccountsModule {}

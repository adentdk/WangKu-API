import { Module } from '@nestjs/common';

import { TransactionDebtsController } from './transaction-debts.controller';
import { TransactionDebtsService } from './transaction-debts.service';

@Module({
  controllers: [TransactionDebtsController],
  providers: [TransactionDebtsService],
})
export class TransactionDebtsModule {}

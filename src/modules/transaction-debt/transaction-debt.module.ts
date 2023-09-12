import { Module } from '@nestjs/common';
import { TransactionDebtService } from './transaction-debt.service';
import { TransactionDebtController } from './transaction-debt.controller';

@Module({
  providers: [TransactionDebtService],
  controllers: [TransactionDebtController]
})
export class TransactionDebtModule {}

import { Module } from '@nestjs/common';
import { TransactionCreditController } from './transaction-credit.controller';
import { TransactionCreditService } from './transaction-credit.service';

@Module({
  controllers: [TransactionCreditController],
  providers: [TransactionCreditService]
})
export class TransactionCreditModule {}

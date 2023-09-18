import { Module } from '@nestjs/common';
import { AuthTransactionDebtsController } from './auth-transaction-debts.controller';

@Module({
  controllers: [AuthTransactionDebtsController]
})
export class AuthTransactionDebtsModule {}

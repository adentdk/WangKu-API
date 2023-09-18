import { Module } from '@nestjs/common';

import { CaslModule } from 'modules/casl/casl.module';
import { TransactionsModule } from 'modules/transactions/transactions.module';

import { AuthTransactionsController } from './auth-transactions.controller';

@Module({
  imports: [CaslModule, TransactionsModule],
  controllers: [AuthTransactionsController],
})
export class AuthTransactionsModule {}

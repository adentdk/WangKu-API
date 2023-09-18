import { Module } from '@nestjs/common';
import { AuthTransactionAccountsController } from './auth-transaction-accounts.controller';

@Module({
  controllers: [AuthTransactionAccountsController]
})
export class AuthTransactionAccountsModule {}

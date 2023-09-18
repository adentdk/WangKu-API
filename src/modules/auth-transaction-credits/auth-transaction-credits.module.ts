import { Module } from '@nestjs/common';
import { AuthTransactionCreditsController } from './auth-transaction-credits.controller';

@Module({
  controllers: [AuthTransactionCreditsController]
})
export class AuthTransactionCreditsModule {}

import { Module } from '@nestjs/common';
import { AuthTransactionCategoriesController } from './auth-transaction-categories.controller';

@Module({
  controllers: [AuthTransactionCategoriesController]
})
export class AuthTransactionCategoriesModule {}

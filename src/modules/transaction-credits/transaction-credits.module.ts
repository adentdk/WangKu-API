import { Module } from '@nestjs/common';

import { TransactionCreditsController } from './transaction-credits.controller';
import { TransactionCreditsService } from './transaction-credits.service';

@Module({
  providers: [TransactionCreditsService],
  controllers: [TransactionCreditsController],
})
export class TransactionCreditsModule {}

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { TransactionCreditsController } from './transaction-credits.controller';
import { TransactionCredit } from './transaction-credits.entity';
import { TransactionCreditsService } from './transaction-credits.service';

@Module({
  imports: [SequelizeModule.forFeature([TransactionCredit])],
  providers: [TransactionCreditsService],
  controllers: [TransactionCreditsController],
})
export class TransactionCreditsModule {}

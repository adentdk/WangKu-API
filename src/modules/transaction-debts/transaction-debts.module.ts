import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { TransactionDebtsController } from './transaction-debts.controller';
import { TransactionDebt } from './transaction-debts.entity';
import { TransactionDebtsService } from './transaction-debts.service';

@Module({
  imports: [SequelizeModule.forFeature([TransactionDebt])],
  controllers: [TransactionDebtsController],
  providers: [TransactionDebtsService],
})
export class TransactionDebtsModule {}

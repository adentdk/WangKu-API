import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { TransactionCategoriesController } from './transaction-categories.controller';
import { TransactionCategory } from './transaction-categories.entity';
import { TransactionCategoriesService } from './transaction-categories.service';

@Module({
  imports: [SequelizeModule.forFeature([TransactionCategory])],
  providers: [TransactionCategoriesService],
  controllers: [TransactionCategoriesController],
})
export class TransactionCategoriesModule {}

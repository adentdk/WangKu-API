import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { CaslModule } from 'modules/casl/casl.module';

import { TransactionCategoriesController } from './transaction-categories.controller';
import { TransactionCategory } from './transaction-categories.entity';
import { TransactionCategoriesService } from './transaction-categories.service';

@Module({
  imports: [SequelizeModule.forFeature([TransactionCategory]), CaslModule],
  providers: [TransactionCategoriesService],
  controllers: [TransactionCategoriesController],
})
export class TransactionCategoriesModule {}

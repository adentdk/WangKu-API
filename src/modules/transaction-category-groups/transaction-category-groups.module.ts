import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { CaslModule } from 'modules/casl/casl.module';

import { TransactionCategoryGroupsController } from './transaction-category-groups.controller';
import { TransactionCategoryGroup } from './transaction-category-groups.entity';
import { TransactionCategoryGroupsService } from './transaction-category-groups.service';

@Module({
  imports: [SequelizeModule.forFeature([TransactionCategoryGroup]), CaslModule],
  controllers: [TransactionCategoryGroupsController],
  providers: [TransactionCategoryGroupsService],
})
export class TransactionCategoryGroupsModule {}

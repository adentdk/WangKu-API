import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { TransactionAccountsController } from './transaction-accounts.controller';
import { TransactionAccount } from './transaction-accounts.entity';
import { TransactionAccountsService } from './transaction-accounts.service';

@Module({
  imports: [SequelizeModule.forFeature([TransactionAccount])],
  providers: [TransactionAccountsService],
  controllers: [TransactionAccountsController],
})
export class TransactionAccountsModule {}

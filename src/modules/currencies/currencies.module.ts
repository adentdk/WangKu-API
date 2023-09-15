import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { CurrenciesController } from './currencies.controller';
import { Currency } from './currencies.entity';
import { CurrenciesService } from './currencies.service';

@Module({
  imports: [SequelizeModule.forFeature([Currency])],
  providers: [CurrenciesService],
  controllers: [CurrenciesController],
})
export class CurrenciesModule {}

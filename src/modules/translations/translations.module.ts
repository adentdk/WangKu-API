import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Language } from 'modules/languages/languages.entity';

import { TranslationsController } from './translations.controller';
import { Translation } from './translations.entity';
import { TranslationsService } from './translations.service';

@Module({
  imports: [SequelizeModule.forFeature([Translation, Language])],
  controllers: [TranslationsController],
  providers: [TranslationsService],
})
export class TranslationsModule {}

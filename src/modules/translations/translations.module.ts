import { Module } from '@nestjs/common';
import { TranslationsService } from './translations.service';
import { TranslationsController } from './translations.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Translation } from './translations.entity';
import { Language } from 'modules/languages/languages.entity';

@Module({
  imports: [SequelizeModule.forFeature([Translation, Language])],
  controllers: [TranslationsController],
  providers: [TranslationsService],
})
export class TranslationsModule {}

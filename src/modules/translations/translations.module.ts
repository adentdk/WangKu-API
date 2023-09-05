import { Module } from '@nestjs/common';
import { TranslationsService } from './services/translations.service';
import { TranslationsController } from './controllers/translations.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Translation } from './entities/translation.entity';
import { Language } from './entities/language.entity';

@Module({
  imports: [SequelizeModule.forFeature([Translation, Language])],
  controllers: [TranslationsController],
  providers: [TranslationsService],
})
export class TranslationsModule {}

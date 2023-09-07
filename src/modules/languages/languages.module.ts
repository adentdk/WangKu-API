import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { LanguagesController } from './languages.controller';
import { Language } from './languages.entity';
import { LanguagesService } from './languages.service';

@Module({
  imports: [SequelizeModule.forFeature([Language])],
  controllers: [LanguagesController],
  providers: [LanguagesService],
})
export class TranslationsModule {}

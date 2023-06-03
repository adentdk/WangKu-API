import { Injectable } from '@nestjs/common';
import { CreateTranslationDto } from '../dto/create-translation.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Translation } from '../entities/translation.entity';
import { Language } from '../entities/language.entity';
import { ListTranslationParamsDto } from '../dto/list-translation-params.dto';

@Injectable()
export class TranslationsService {
  constructor(
    @InjectModel(Translation) private translationModel: typeof Translation,
    @InjectModel(Language) private languageModel: typeof Language,
  ) {}
  create(createTranslationDto: CreateTranslationDto) {
    return this.translationModel.create(createTranslationDto);
  }

  findAll({ page = 1, pageSize = 10 }: ListTranslationParamsDto) {
    return this.translationModel.findAllPaginated({
      page,
      pageSize,
    });
  }
}

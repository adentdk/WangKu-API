import { Injectable } from '@nestjs/common';
import { CreateTranslationDto } from './dto/create-translation.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Translation } from './translations.entity';
import { Language } from '../languages/languages.entity';
import { ListTranslationParamsDto } from './dto/list-translation-params.dto';
import { TranslateLanguageNsDto } from './dto/translate-language-ns.dto';
import { Sequelize } from 'sequelize-typescript';
import { transformTranslation } from 'shared/helpers/translations';

@Injectable()
export class TranslationsService {
  constructor(
    private readonly sequelize: Sequelize,
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

  async translateByLanguageAndNamespace({
    langCode,
    ns,
  }: TranslateLanguageNsDto) {
    const translations = await this.translationModel.findAll({
      attributes: [
        'namespace',
        'key',
        'value',
        [this.sequelize.col('language.code'), 'langCode'],
      ],
      where: {
        namespace: ns,
      },
      include: [
        {
          model: this.languageModel,
          attributes: [],
          required: true,
          where: {
            code: langCode,
          },
        },
      ],
    });

    return transformTranslation(
      translations.map((item: any) => ({
        namespace: item.namespace,
        key: item.key,
        value: item.value,
        langCode: item.getDataValue('langCode'),
      })),
    );
  }
}

import { Controller, Body, Query, Param } from '@nestjs/common';
import { TranslationsService } from '../services/translations.service';
import { CreateTranslationDto } from '../dto/create-translation.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  AddTranslateDecorators,
  CreateTranslationDecorators,
  ListTranslationDecorators,
  TranslateDecorators,
} from '../decorators/translations.controller.decorators';
import { ListTranslationParamsDto } from '../dto/list-translation-params.dto';

@ApiTags('translations')
@Controller('translations')
export class TranslationsController {
  constructor(private readonly translationsService: TranslationsService) {}

  @CreateTranslationDecorators()
  create(@Body() createTranslationDto: CreateTranslationDto) {
    return this.translationsService.create(createTranslationDto);
  }

  @ListTranslationDecorators()
  findAll(@Query() listTranslationDto: ListTranslationParamsDto) {
    return this.translationsService.findAll(listTranslationDto);
  }

  @TranslateDecorators()
  translate(@Param('langCode') langCode: string, @Param('ns') ns: string) {
    return this.translationsService.translateByLanguageAndNamespace({
      langCode,
      ns,
    });
  }

  @AddTranslateDecorators()
  addTranslate(
    @Param('langCode') langCode: string,
    @Param('ns') ns: string,
    @Body() body: any,
  ) {
    console.log({ langCode, ns, data: body });
    return {
      langCode,
      ns,
      data: body,
    };
  }
}

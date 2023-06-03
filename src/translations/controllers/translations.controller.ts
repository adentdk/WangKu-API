import { Controller, Body, Query } from '@nestjs/common';
import { TranslationsService } from '../services/translations.service';
import { CreateTranslationDto } from '../dto/create-translation.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateTranslationDecorators,
  ListTranslationDecorators,
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
}

import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import {
  ApiInternalServerResponse,
  ApiPaginatedResponse,
  ApiValidationResponse,
} from 'shared/decorators/swagger';

import { BaseTranslationDto } from './dto/base-translation.dto';
import { CreateTranslationDto } from './dto/create-translation.dto';
import { ListTranslationParamsDto } from './dto/list-translation-params.dto';
import { TranslationsService } from './translations.service';

@ApiTags('translations')
@Controller('translations')
export class TranslationsController {
  constructor(private readonly translationsService: TranslationsService) {}

  @Post()
  @ApiCreatedResponse({ type: BaseTranslationDto })
  @ApiValidationResponse()
  @ApiInternalServerResponse()
  create(@Body() createTranslationDto: CreateTranslationDto) {
    return this.translationsService.create(createTranslationDto);
  }

  @Get()
  @ApiPaginatedResponse(BaseTranslationDto)
  @ApiValidationResponse()
  @ApiInternalServerResponse()
  findAll(@Query() listTranslationDto: ListTranslationParamsDto) {
    return this.translationsService.findAll(listTranslationDto);
  }

  @Get('languages/:langCode/namespaces/:ns')
  @ApiInternalServerResponse()
  translate(@Param('langCode') langCode: string, @Param('ns') ns: string) {
    return this.translationsService.translateByLanguageAndNamespace({
      langCode,
      ns,
    });
  }

  @Post('languages/:langCode/namespaces/:ns')
  @ApiInternalServerResponse()
  addTranslate(
    @Param('langCode') langCode: string,
    @Param('ns') ns: string,
    @Body() body: any,
  ) {
    return {
      langCode,
      ns,
      data: body,
    };
  }
}

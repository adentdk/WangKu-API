import { Controller, Body, Query, Param, Post, Get } from '@nestjs/common';
import { TranslationsService } from './translations.service';
import { CreateTranslationDto } from './dto/create-translation.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ListTranslationParamsDto } from './dto/list-translation-params.dto';
import { BaseTranslationDto } from './dto/base-translation.dto';
import {
  ApiInternalServerResponse,
  ApiPaginatedResponse,
  ApiValidationResponse,
} from 'shared/decorators/swagger';

@ApiTags('translations')
@Controller('translations')
export class TranslationsController {
  constructor(private readonly translationsService: TranslationsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'success',
    type: BaseTranslationDto,
  })
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

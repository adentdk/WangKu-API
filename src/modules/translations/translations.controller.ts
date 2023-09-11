import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiPaginatedResponse,
  ApiUnauthorizedResponse,
  ApiValidationResponse,
} from 'shared/decorators/swagger';

import { BaseTranslationDto } from './dto/base-translation.dto';
import { CreateTranslationDto } from './dto/create-translation.dto';
import { ListTranslationParamsDto } from './dto/list-translation-params.dto';
import { TranslationsService } from './translations.service';

@ApiTags('translations')
@Controller('translations')
@ApiForbiddenResponse()
@ApiValidationResponse()
@ApiInternalServerErrorResponse()
@ApiBadRequestResponse()
@ApiUnauthorizedResponse()
export class TranslationsController {
  constructor(private readonly translationsService: TranslationsService) {}

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: BaseTranslationDto })
  create(@Body() createTranslationDto: CreateTranslationDto) {
    return this.translationsService.create(createTranslationDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiPaginatedResponse(BaseTranslationDto)
  @ApiValidationResponse()
  findAll(@Query() listTranslationDto: ListTranslationParamsDto) {
    return this.translationsService.findAll(listTranslationDto);
  }

  @Get('languages/:langCode/namespaces/:ns')
  @ApiBearerAuth()
  @ApiBasicAuth()
  translate(@Param('langCode') langCode: string, @Param('ns') ns: string) {
    return this.translationsService.translateByLanguageAndNamespace({
      langCode,
      ns,
    });
  }

  @Post('languages/:langCode/namespaces/:ns')
  @ApiBearerAuth()
  @ApiBasicAuth()
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

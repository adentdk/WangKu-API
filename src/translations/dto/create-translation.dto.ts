import { PickType } from '@nestjs/swagger';
import { BaseTranslationDto } from './base-translation.dto';

export class CreateTranslationDto extends PickType(BaseTranslationDto, [
  'lang',
  'group',
  'key',
  'value',
]) {}

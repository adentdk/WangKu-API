import { PickType } from '@nestjs/swagger';
import { BaseTranslationDto } from './base-translation.dto';

export class CreateTranslationDto extends PickType(BaseTranslationDto, [
  'namespace',
  'key',
  'value',
]) {}

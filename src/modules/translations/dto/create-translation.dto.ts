import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { BaseTranslationDto } from './base-translation.dto';

export class CreateTranslationDto extends PickType(BaseTranslationDto, [
  'namespace',
  'key',
  'value',
]) {
  @ApiProperty()
  @IsNotEmpty()
  languageId: number;
}

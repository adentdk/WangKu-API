import { ApiProperty, PickType } from '@nestjs/swagger';
import { BaseTranslationDto } from './base-translation.dto';
import { IsNotEmpty } from 'class-validator';

export class CreateTranslationDto extends PickType(BaseTranslationDto, [
  'namespace',
  'key',
  'value',
]) {
  @ApiProperty()
  @IsNotEmpty()
  languageId: number;
}

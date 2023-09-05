import { PickType } from '@nestjs/swagger';
import { BaseLanguageDto } from './base-language.dto';

export class CreateLanguageDto extends PickType(BaseLanguageDto, [
  'code',
  'name',
]) {}

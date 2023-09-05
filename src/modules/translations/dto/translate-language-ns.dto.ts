import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class TranslateLanguageNsDto {
  @ApiProperty()
  @IsNotEmpty()
  langCode: string;

  @ApiProperty()
  @IsNotEmpty()
  ns: string;
}

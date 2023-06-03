import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class BaseTranslationDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(2)
  lang: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(32)
  group: string;

  @ApiProperty()
  @IsNotEmpty()
  key: string;

  @ApiProperty()
  @IsNotEmpty()
  value: string;
}

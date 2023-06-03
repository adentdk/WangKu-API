import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class BaseLanguageDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(32)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(12)
  code: string;
}

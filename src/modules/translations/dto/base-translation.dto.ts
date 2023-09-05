import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class BaseTranslationDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  namespace: string;

  @ApiProperty()
  @IsNotEmpty()
  key: string;

  @ApiProperty()
  @IsNotEmpty()
  value: string;
}

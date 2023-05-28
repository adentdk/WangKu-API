import { ApiProperty } from '@nestjs/swagger';
import { BaseErrorDto } from './base-error';
import { Type } from 'class-transformer';
import { FieldErrorDto } from './field-error';

export class ValidationErrorDto extends BaseErrorDto {
  @ApiProperty({
    type: [FieldErrorDto],
  })
  @Type(() => FieldErrorDto)
  fields: FieldErrorDto[];
}

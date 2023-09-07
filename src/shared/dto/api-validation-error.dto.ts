import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { BaseErrorResponseDto } from './base-error-response.dto';

class Constraints {
  [k: string]: string;
}

export class FieldErrorDto {
  @ApiProperty()
  field: string;

  @ApiProperty({ type: Constraints })
  @Type(() => Constraints)
  constraints: Constraints;
}

export class ApiValidationErrorDto extends BaseErrorResponseDto {
  @ApiProperty({
    type: [FieldErrorDto],
  })
  @Type(() => FieldErrorDto)
  fields: FieldErrorDto[];
}

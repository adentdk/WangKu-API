import { ApiProperty } from '@nestjs/swagger';
import { BaseErrorResponseDto } from './base-error-response.dto';
import { Type } from 'class-transformer';

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

import { ApiProperty } from '@nestjs/swagger';
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

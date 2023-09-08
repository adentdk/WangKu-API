import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

import { BaseEntityDto } from 'shared/dto/base-entity.dto';

export class BaseRoleDto extends BaseEntityDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(32)
  name: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(64)
  description?: string;
}

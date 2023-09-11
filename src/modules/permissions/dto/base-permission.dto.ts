import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsOptional, MaxLength } from 'class-validator';

import { BaseEntityDto } from 'shared/dto/base-entity.dto';

export class BasePermissionDto extends BaseEntityDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(64)
  name: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(255)
  description?: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(32)
  action: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(255)
  subject: string;

  @ApiProperty()
  @IsOptional()
  @IsObject()
  conditions?: string;
}

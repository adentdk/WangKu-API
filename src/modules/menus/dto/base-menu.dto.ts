import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

import { BaseEntityNumberDto } from 'shared/dto/base-entity.dto';
import { IconType } from 'shared/types/general';

export class BaseMenu extends BaseEntityNumberDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @MaxLength(64)
  identifier: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @MaxLength(32)
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  href?: string | null;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(IconType)
  iconType?: IconType | null;

  @ApiProperty({ required: false })
  @IsOptional()
  icon?: string | null;

  @ApiProperty({ required: false })
  @IsOptional()
  parentId?: number;
}

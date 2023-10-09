import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { BaseEntityDto } from 'shared/dto/base-entity.dto';
import { IconType } from 'shared/types/general';

export class BaseTransactionCategoryGroup extends BaseEntityDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(32)
  name: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(255)
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  icon: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(IconType)
  iconType: IconType;

  @ApiProperty()
  @IsOptional()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  tNameKey: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  tDescKey: string;
}

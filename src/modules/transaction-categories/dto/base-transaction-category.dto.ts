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
import { TransactionType } from 'shared/types/transaction';

export class BaseTransactionCategory extends BaseEntityDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(32)
  name: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(255)
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(TransactionType)
  type: TransactionType;

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
  transactionCategoryGroupId: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  tNameKey: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  tDescKey: string;
}

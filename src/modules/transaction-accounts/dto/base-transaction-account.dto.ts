import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { BaseEntityDto } from 'shared/dto/base-entity.dto';
import { IconType } from 'shared/types/general';
import { TransactionAccountType } from 'shared/types/transaction';

export class BaseTransactionAccount extends BaseEntityDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(32)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(TransactionAccountType)
  type: TransactionAccountType;

  @ApiProperty()
  @IsOptional()
  @IsString()
  icon: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(IconType)
  iconType: IconType;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  default: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  currencyCode: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  currentBalance: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  userId: string;
}

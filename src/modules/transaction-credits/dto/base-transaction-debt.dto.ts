import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

import { BaseEntityDto } from 'shared/dto/base-entity.dto';
import { SimpleUser } from 'shared/dto/simple-user.dto';

export class BaseTransactionDebt extends BaseEntityDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  currencyCode: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  amount: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString({ strict: true })
  date: string;

  @ApiProperty({ type: SimpleUser })
  @IsOptional()
  @Type(() => SimpleUser)
  debtor: SimpleUser;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  categoryId: string;
}

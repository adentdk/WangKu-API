import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

export class PaginationReqQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  page?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  pageSize?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc';

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  orderBy?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  search?: string;
}

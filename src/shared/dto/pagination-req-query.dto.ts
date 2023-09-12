import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumberString, IsOptional, IsString } from 'class-validator';

export class PaginationReqQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  page?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
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

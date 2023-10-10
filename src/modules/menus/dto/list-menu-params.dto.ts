import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { PaginationReqQueryDto } from 'shared/dto/pagination-req-query.dto';

export class ListMenuParams extends PaginationReqQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  parentId?: number | 'NULL';
}

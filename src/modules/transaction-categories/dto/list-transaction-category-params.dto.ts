import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { PaginationReqQueryDto } from 'shared/dto/pagination-req-query.dto';
import { TransactionType } from 'shared/types/transaction';

export class ListTransactionCategoryParams extends PaginationReqQueryDto {
  @ApiProperty()
  @IsOptional()
  type?: TransactionType;
}

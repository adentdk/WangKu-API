import { ApiProperty } from '@nestjs/swagger';

import { PaginationReqQueryDto } from 'shared/dto/pagination-req-query.dto';
import { BooleanType } from 'shared/types/utils';

export class ListUserParamsDto extends PaginationReqQueryDto {
  @ApiProperty({ required: false, enum: BooleanType })
  withProfile?: BooleanType;
}

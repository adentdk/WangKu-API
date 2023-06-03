import { ApiProperty } from '@nestjs/swagger';
import { PaginationReqQueryDto } from 'src/__common/dto/pagination-req-query.dto';
import { BooleanType } from 'src/__common/types/utils';

export class ListUserParamsDto extends PaginationReqQueryDto {
  @ApiProperty({ required: false, enum: BooleanType })
  withProfile?: BooleanType;
}

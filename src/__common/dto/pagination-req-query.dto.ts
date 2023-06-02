import { ApiProperty } from '@nestjs/swagger';

export class PaginationReqQueryDto {
  @ApiProperty({ required: false })
  page?: number;

  @ApiProperty({ required: false })
  pageSize?: number;

  @ApiProperty({ required: false })
  search?: string;
}

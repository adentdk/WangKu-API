import { ApiProperty } from '@nestjs/swagger';

export class PaginatedDto<TData = any> {
  @ApiProperty()
  total: number;

  @ApiProperty()
  totalPage: number;

  @ApiProperty()
  results: TData[];
}

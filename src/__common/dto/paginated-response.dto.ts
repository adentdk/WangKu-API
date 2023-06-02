import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResponseDto<TData = any> {
  @ApiProperty()
  total: number;

  @ApiProperty()
  totalPage: number;

  @ApiProperty()
  results: TData[];
}

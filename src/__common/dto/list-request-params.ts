import { ApiProperty } from '@nestjs/swagger';

export class ListRequestParamsDto {
  @ApiProperty()
  page?: number;

  @ApiProperty()
  pageSize?: number;

  @ApiProperty()
  search?: string;
}

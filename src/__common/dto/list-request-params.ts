import { ApiProperty } from '@nestjs/swagger';

export class ListRequestParamsDto {
  @ApiProperty({ required: false })
  page?: number;

  @ApiProperty({ required: false })
  pageSize?: number;

  @ApiProperty({ required: false })
  search?: string;
}

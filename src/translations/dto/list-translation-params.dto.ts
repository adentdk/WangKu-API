import { ApiProperty } from '@nestjs/swagger';
import { PaginationReqQueryDto } from 'src/__common/dto/pagination-req-query.dto';

export class ListTranslationParamsDto extends PaginationReqQueryDto {
  @ApiProperty({ required: false })
  languageId?: string;

  @ApiProperty({ required: false })
  languageCode?: string;
}

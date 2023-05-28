import { ApiProperty } from '@nestjs/swagger';
import { ListRequestParamsDto } from 'src/__common/dto/list-request-params';
import { BooleanType } from 'src/__common/types/utils';

export class ListUserParamsDto extends ListRequestParamsDto {
  @ApiProperty({ required: false, enum: BooleanType })
  withProfile?: BooleanType;
}

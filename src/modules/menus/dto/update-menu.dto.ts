import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';

import { CreateMenuDto } from './create-menu.dto';

export class UpdateMenuDto extends PartialType(CreateMenuDto) {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  deletedChildrenIds?: number[];
}

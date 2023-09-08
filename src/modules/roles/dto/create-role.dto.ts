import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional } from 'class-validator';

import { BaseRoleDto } from './base-role.dto';

export class CreateRoleDto extends PickType(BaseRoleDto, [
  'name',
  'description',
]) {
  @ApiProperty({ isArray: true, type: 'number' })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  permissionIds?: number[];
}

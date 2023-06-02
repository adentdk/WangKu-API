import { PickType } from '@nestjs/swagger';
import { BaseRoleDto } from './base-role';

export class CreateRoleDto extends PickType(BaseRoleDto, [
  'name',
  'description',
]) {}

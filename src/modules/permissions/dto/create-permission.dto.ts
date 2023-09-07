import { PickType } from '@nestjs/swagger';

import { BasePermissionDto } from './base-permission.dto';

export class CreatePermissionDto extends PickType(BasePermissionDto, [
  'name',
  'entity',
]) {}

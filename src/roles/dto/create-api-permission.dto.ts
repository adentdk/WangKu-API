import { PickType } from '@nestjs/swagger';
import { BaseApiPermissionDto } from './base-api-permission.dto';

export class CreateApiPermissionDto extends PickType(BaseApiPermissionDto, [
  'name',
  'entity',
]) {}

import { PickType } from '@nestjs/swagger';

import { BaseMenu } from './base-menu.dto';

export class CreateMenuDto extends PickType(
  BaseMenu,
  ['name', 'type', 'description', 'icon', 'iconType', 'userId'],
) {}

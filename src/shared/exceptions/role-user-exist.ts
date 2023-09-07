import { BadRequestException } from '@nestjs/common';

import { ErrorCodes } from 'shared/types/error-code';

export class RoleUserExist extends BadRequestException {
  constructor() {
    super(ErrorCodes.RoleUserExist);
  }
}

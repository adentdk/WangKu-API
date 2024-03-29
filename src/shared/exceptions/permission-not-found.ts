import { BadRequestException } from '@nestjs/common';

import { ErrorCodes } from 'shared/types/error-code';

export class PermissionNotFound extends BadRequestException {
  constructor() {
    super(ErrorCodes.PermissionNotFound);
  }
}

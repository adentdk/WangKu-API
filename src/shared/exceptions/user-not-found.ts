import { BadRequestException } from '@nestjs/common';

import { ErrorCodes } from 'shared/types/error-code';

export class UserNotFound extends BadRequestException {
  constructor() {
    super(ErrorCodes.UserNotFound);
  }
}

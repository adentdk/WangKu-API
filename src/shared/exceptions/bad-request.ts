import { BadRequestException } from '@nestjs/common';

import { ErrorCodes } from 'shared/types/error-code';

export class BadRequest extends BadRequestException {
  constructor(message?: string) {
    super(message || ErrorCodes.BadRequest);
  }
}

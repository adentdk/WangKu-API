import { BadRequestException } from '@nestjs/common';

import { ErrorCodes } from 'shared/types/error-code';

export class BadRequest extends BadRequestException {
  constructor() {
    super(ErrorCodes.BadRequest);
  }
}

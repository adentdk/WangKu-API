import { BadRequestException } from '@nestjs/common';
import { ErrorCodes } from 'src/__common/types/error-code';

export class RoleNotFound extends BadRequestException {
  constructor() {
    super(ErrorCodes.RoleNotFound);
  }
}

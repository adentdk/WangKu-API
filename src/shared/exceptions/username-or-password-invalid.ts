import { BadRequestException } from '@nestjs/common';
import { ErrorCodes } from 'shared/types/error-code';

export class UsernameOrPasswordInValid extends BadRequestException {
  constructor() {
    super(ErrorCodes.UsernameOrPasswordInValid);
  }
}

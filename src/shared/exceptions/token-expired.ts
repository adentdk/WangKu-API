import { UnauthorizedException } from '@nestjs/common';
import { ErrorCodes } from 'shared/types/error-code';

export class TokenExpiredError extends UnauthorizedException {
  constructor() {
    super(ErrorCodes.TokenExpiredError);
  }
}

import { UnauthorizedException } from '@nestjs/common';
import { ErrorCodes } from '../types/error-code';

export class InvalidCredentials extends UnauthorizedException {
  constructor() {
    super(ErrorCodes.InvalidCredentials);
  }
}

import { Injectable } from '@nestjs/common';

import { defineAbilitiesForUser } from './ability';

@Injectable()
export class CaslAbilityFactory {
  createForUser(userId: string) {
    return defineAbilitiesForUser(userId);
  }
}

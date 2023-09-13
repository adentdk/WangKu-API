import { Module } from '@nestjs/common';

import { CaslModule } from 'modules/casl/casl.module';
import { ProfilesModule } from 'modules/profiles/profiles.module';

import { AuthProfileController } from './auth-profile.controller';

@Module({
  imports: [ProfilesModule, CaslModule],
  controllers: [AuthProfileController],
  providers: [],
})
export class AuthProfileModule {}

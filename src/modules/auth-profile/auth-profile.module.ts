import { Module } from '@nestjs/common';

import { UsersModule } from 'modules/users/users.module';

import { AuthProfileController } from './auth-profile.controller';

@Module({
  imports: [UsersModule],
  controllers: [AuthProfileController],
  providers: [],
})
export class AuthProfileModule {}

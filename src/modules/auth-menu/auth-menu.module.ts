import { Module } from '@nestjs/common';

import { UsersModule } from 'modules/users/users.module';

import { AuthMenuController } from './auth-menu.controller';

@Module({
  imports: [UsersModule],
  controllers: [AuthMenuController],
})
export class AuthMenuModule {}

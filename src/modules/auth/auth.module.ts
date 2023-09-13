import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { LocalAuthStrategy } from 'shared/stategies/local-auth.stategy';

import { UsersModule } from 'modules/users/users.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [ConfigModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService, LocalAuthStrategy],
})
export class AuthModule {}

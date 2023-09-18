import { Module } from '@nestjs/common';
import { AuthSyncController } from './auth-sync.controller';

@Module({
  controllers: [AuthSyncController]
})
export class AuthSyncModule {}

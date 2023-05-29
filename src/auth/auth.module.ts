import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { AppJwtModule } from 'src/app-jwt/app-jwt.module';

@Module({
  imports: [UsersModule, AppJwtModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

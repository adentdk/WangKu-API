import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from './services/jwt';
import { JwtStrategy } from './stategy/jwt.strategy';
import { LocalStrategy } from './stategy/local.stategy';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        global: true,
        secret: config.get<string>('jwt.secret'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import env from './__common/env';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [env],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        dialect: 'postgres',
        host: config.get<string>('DB_HOST'),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        autoLoadModels: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}

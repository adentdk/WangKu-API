import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';

import env from './__common/env';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { TranslationsModule } from './translations/translations.module';
import { JwtAuthStrategy } from './__common/stategies/jwt-auth.strategy';
import { BasicAuthStrategy } from './__common/stategies/basic-auth.strategy';
import { TransactionsModule } from './transactions/transactions.module';

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
    RolesModule,
    UsersModule,
    TranslationsModule,
    TransactionsModule,
  ],
  controllers: [],
  providers: [AppService, JwtAuthStrategy, BasicAuthStrategy],
})
export class AppModule {}

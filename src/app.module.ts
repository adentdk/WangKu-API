import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { PermissionsModule } from 'modules/permissions/permissions.module';
import { ProfilesModule } from 'modules/profiles/profiles.module';
import { RolePermissionModule } from 'modules/role-permission/role-permission.module';
import { RoleUserModule } from 'modules/role-user/role-user.module';

import { AuthModule } from './modules/auth/auth.module';
import { RolesModule } from './modules/roles/roles.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { TranslationsModule } from './modules/translations/translations.module';
import { UsersModule } from './modules/users/users.module';
import env from './shared/env';
import { BasicAuthStrategy } from './shared/stategies/basic-auth.strategy';
import { JwtAuthStrategy } from './shared/stategies/jwt-auth.strategy';

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
    PermissionsModule,
    RolePermissionModule,
    RolesModule,
    UsersModule,
    ProfilesModule,
    RoleUserModule,
    TranslationsModule,
    TransactionsModule,
  ],
  controllers: [],
  providers: [JwtAuthStrategy, BasicAuthStrategy],
})
export class AppModule {}

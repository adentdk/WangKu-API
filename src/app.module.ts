import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';

import env from './shared/env';
import { JwtAuthStrategy } from './shared/stategies/jwt-auth.strategy';
import { BasicAuthStrategy } from './shared/stategies/basic-auth.strategy';

import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { RolesModule } from './modules/roles/roles.module';
import { TranslationsModule } from './modules/translations/translations.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { PermissionsModule } from 'modules/permissions/permissions.module';
import { RolePermissionModule } from 'modules/role-permission/role-permission.module';
import { ProfilesModule } from 'modules/profiles/profiles.module';
import { RoleUserModule } from 'modules/role-user/role-user.module';

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

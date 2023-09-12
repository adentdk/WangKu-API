import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import env from 'shared/env';
import { BasicAuthStrategy } from 'shared/stategies/basic-auth.strategy';
import { JwtAuthStrategy } from 'shared/stategies/jwt-auth.strategy';

import { AuthModule } from 'modules/auth/auth.module';
import { CaslModule } from 'modules/casl/casl.module';
import { CurrenciesModule } from 'modules/currencies/currencies.module';
import { EventsModule } from 'modules/events/events.module';
import { PermissionsModule } from 'modules/permissions/permissions.module';
import { ProfilesModule } from 'modules/profiles/profiles.module';
import { RolePermissionModule } from 'modules/role-permission/role-permission.module';
import { RoleUserModule } from 'modules/role-user/role-user.module';
import { RolesModule } from 'modules/roles/roles.module';
import { TransactionAccountsModule } from 'modules/transaction-accounts/transaction-accounts.module';
import { TransactionCategoriesModule } from 'modules/transaction-categories/transaction-categories.module';
import { TransactionCategoryGroupsModule } from 'modules/transaction-category-groups/transaction-category-groups.module';
import { TransactionCreditsModule } from 'modules/transaction-credits/transaction-credits.module';
import { TransactionDebtsModule } from 'modules/transaction-debts/transaction-debts.module';
import { TransactionsModule } from 'modules/transactions/transactions.module';
import { TranslationsModule } from 'modules/translations/translations.module';
import { UsersModule } from 'modules/users/users.module';
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
    CaslModule,
    TransactionCategoriesModule,
    TransactionCategoryGroupsModule,
    TransactionCreditsModule,
    TransactionDebtsModule,
    TransactionAccountsModule,
    EventsModule,
    CurrenciesModule,
  ],
  controllers: [],
  providers: [JwtAuthStrategy, BasicAuthStrategy],
})
export class AppModule {}

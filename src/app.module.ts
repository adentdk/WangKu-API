import { BullModule } from '@nestjs/bull';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { redisStore } from 'cache-manager-redis-store';
import { RedisClientOptions } from 'redis';

import env from 'shared/env';
import { BasicAuthStrategy } from 'shared/stategies/basic-auth.strategy';
import { JwtAuthStrategy } from 'shared/stategies/jwt-auth.strategy';

import { AuthModule } from 'modules/auth/auth.module';
import { AuthProfileModule } from 'modules/auth-profile/auth-profile.module';
import { AuthTransactionsModule } from 'modules/auth-transactions/auth-transactions.module';
import { CaslModule } from 'modules/casl/casl.module';
import { CurrenciesModule } from 'modules/currencies/currencies.module';
import { EventsModule } from 'modules/events/events.module';
import { IconBundlesModule } from 'modules/icon-bundles/icon-bundles.module';
import { IconsModule } from 'modules/icons/icons.module';
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

import { AuthSyncModule } from './modules/auth-sync/auth-sync.module';
import { AuthTransactionAccountsModule } from './modules/auth-transaction-accounts/auth-transaction-accounts.module';
import { AuthTransactionCategoriesModule } from './modules/auth-transaction-categories/auth-transaction-categories.module';
import { AuthTransactionCreditsModule } from './modules/auth-transaction-credits/auth-transaction-credits.module';
import { AuthTransactionDebtsModule } from './modules/auth-transaction-debts/auth-transaction-debts.module';
import { MenusModule } from './modules/menus/menus.module';
import { RoleMenuModule } from './modules/role-menu/role-menu.module';

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
        sync: {
          alter: {
            drop: false,
          },
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        url: config.get<string>('queue.url'),
      }),
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      global: true,
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('jwt.accessSecret'),
      }),
      inject: [ConfigService],
    }),
    CacheModule.registerAsync<RedisClientOptions>({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        store: await redisStore({
          url: config.get<string>('cache.url'),
          ttl: +config.get<string>('cache.ttl'),
        }),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    AuthProfileModule,
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
    IconsModule,
    IconBundlesModule,
    AuthTransactionsModule,
    AuthTransactionAccountsModule,
    AuthTransactionCreditsModule,
    AuthTransactionDebtsModule,
    AuthTransactionCategoriesModule,
    AuthSyncModule,
    MenusModule,
    RoleMenuModule,
  ],
  controllers: [],
  providers: [JwtAuthStrategy, BasicAuthStrategy],
})
export class AppModule {}

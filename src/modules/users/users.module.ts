import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { CaslModule } from 'modules/casl/casl.module';
import { Profile } from 'modules/profiles/profiles.entity';
import { RolesModule } from 'modules/roles/roles.module';

import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UserService } from './users.service';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Profile]),
    RolesModule,
    CaslModule,
  ],
  controllers: [UsersController],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}

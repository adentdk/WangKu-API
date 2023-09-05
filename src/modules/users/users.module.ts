import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.entity';
import { RolesModule } from 'modules/roles/roles.module';
import { Profile } from 'modules/profiles/profiles.entity';

@Module({
  imports: [SequelizeModule.forFeature([User, Profile]), RolesModule],
  controllers: [UsersController],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}

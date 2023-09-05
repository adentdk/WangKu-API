import { Module } from '@nestjs/common';
import { UserService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';
import { RoleUser } from './entities/role-user.entity';
import { RolesModule } from 'modules/roles/roles.module';

@Module({
  imports: [SequelizeModule.forFeature([User, Profile, RoleUser]), RolesModule],
  controllers: [UsersController],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}

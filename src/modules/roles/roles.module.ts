import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Permission } from 'modules/permissions/permissions.entity';
import { PermissionsModule } from 'modules/permissions/permissions.module';
import { RolePermissionModule } from 'modules/role-permission/role-permission.module';

import { RolesController } from './roles.controller';
import { Role } from './roles.entity';
import { RolesService } from './roles.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Role, Permission]),
    PermissionsModule,
    RolePermissionModule,
  ],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}

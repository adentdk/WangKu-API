import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { PermissionsModule } from 'modules/permissions/permissions.module';
import { RolePermissionModule } from 'modules/role-permission/role-permission.module';

import { RolesController } from './roles.controller';
import { Role } from './roles.entity';
import { RolesService } from './roles.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Role]),
    PermissionsModule,
    RolePermissionModule,
  ],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}

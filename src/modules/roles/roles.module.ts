import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './roles.entity';
import { PermissionsModule } from 'modules/permissions/permissions.module';
import { RolePermissionModule } from 'modules/role-permission/role-permission.module';

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

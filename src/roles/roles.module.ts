import { Module } from '@nestjs/common';
import { RolesService } from './services/role.service';
import { RoleController } from './controllers/role.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { RolePermission } from './entities/role-permission.entity';
import { PermissionController } from './controllers/permission.controller';
import { PermissionService } from './services/permission.service';

@Module({
  imports: [SequelizeModule.forFeature([Role, Permission, RolePermission])],
  controllers: [RoleController, PermissionController],
  providers: [RolesService, PermissionService],
  exports: [RolesService, PermissionService],
})
export class RolesModule {}

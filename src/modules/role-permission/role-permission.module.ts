import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RolePermission } from './role-permission.entity';
@Module({
  imports: [SequelizeModule.forFeature([RolePermission])],
  controllers: [],
  providers: [],
  exports: [],
})
export class RolePermissionModule {}

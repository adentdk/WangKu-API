import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './entities/role.entity';
import { ApiPermission } from './entities/api-permission.entity';
import { RoleApiPermission } from './entities/role-api-permission.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Role, ApiPermission, RoleApiPermission]),
  ],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}

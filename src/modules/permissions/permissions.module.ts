import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { PermissionsController } from './permissions.controller';
import { Permission } from './permissions.entity';
import { PermissionService } from './permissions.service';

@Module({
  imports: [SequelizeModule.forFeature([Permission])],
  controllers: [PermissionsController],
  providers: [PermissionService],
  exports: [PermissionService],
})
export class PermissionsModule {}

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { RoleMenuController } from './role-menu.controller';
import { RoleMenu } from './role-menu.entity';
import { RoleMenuService } from './role-menu.service';

@Module({
  imports: [SequelizeModule.forFeature([RoleMenu])],
  controllers: [RoleMenuController],
  providers: [RoleMenuService],
})
export class RoleMenuModule {}

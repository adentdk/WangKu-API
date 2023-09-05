import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoleUser } from './role-user.entity';
@Module({
  imports: [SequelizeModule.forFeature([RoleUser])],
  controllers: [],
  providers: [],
  exports: [],
})
export class RoleUserModule {}

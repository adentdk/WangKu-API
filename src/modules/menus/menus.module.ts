import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { CaslModule } from 'modules/casl/casl.module';

import { MenusController } from './menus.controller';
import { Menu } from './menus.entity';
import { MenusService } from './menus.service';

@Module({
  imports: [SequelizeModule.forFeature([Menu]), CaslModule],
  controllers: [MenusController],
  providers: [MenusService],
})
export class MenusModule {}

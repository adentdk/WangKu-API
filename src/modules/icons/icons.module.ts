import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { IconsController } from './icons.controller';
import { Icon } from './icons.entity';
import { IconsService } from './icons.service';

@Module({
  imports: [SequelizeModule.forFeature([Icon])],
  providers: [IconsService],
  controllers: [IconsController],
})
export class IconsModule {}

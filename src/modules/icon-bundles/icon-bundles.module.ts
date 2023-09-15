import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { IconBundlesController } from './icon-bundles.controller';
import { IconBundle } from './icon-bundles.entity';
import { IconBundlesService } from './icon-bundles.service';

@Module({
  imports: [SequelizeModule.forFeature([IconBundle])],
  providers: [IconBundlesService],
  controllers: [IconBundlesController],
})
export class IconBundlesModule {}

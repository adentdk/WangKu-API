import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Profile } from './profiles.entity';
import { ProfilesService } from './profiles.service';
@Module({
  imports: [SequelizeModule.forFeature([Profile])],
  controllers: [],
  providers: [ProfilesService],
  exports: [],
})
export class ProfilesModule {}

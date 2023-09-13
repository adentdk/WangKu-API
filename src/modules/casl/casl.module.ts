import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { User } from 'modules/users/user.entity';

import { CaslAbilityFactory } from './casl-ability.factory';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [CaslAbilityFactory],
  exports: [CaslAbilityFactory],
})
export class CaslModule {}

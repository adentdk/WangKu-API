import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { EventsController } from './events.controller';
import { Event } from './events.entity';
import { EventsService } from './events.service';

@Module({
  imports: [SequelizeModule.forFeature([Event])],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}

import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import { Profile } from 'modules/profiles/profiles.entity';

@Injectable()
export class ProfilesService {
  constructor(@InjectModel(Profile) private profileModel: typeof Profile) {}
}

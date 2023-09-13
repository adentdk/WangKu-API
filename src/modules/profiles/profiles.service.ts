import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { UserNotFound } from 'shared/exceptions/user-not-found';

import { Profile } from 'modules/profiles/profiles.entity';

@Injectable()
export class ProfilesService {
  constructor(@InjectModel(Profile) private profileModel: typeof Profile) {}

  async findProfileByUserId(userId: string) {
    const profile = await this.profileModel.findOne({
      where: { userId },
    });
    if (profile === null) throw new UserNotFound();

    return profile;
  }
}

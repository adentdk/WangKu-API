import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { UserNotFound } from 'shared/exceptions/user-not-found';

import { Profile } from 'modules/profiles/profiles.entity';

import { UpdateProfileDto } from './dto/update-profile.dto';

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

  async updateProfileByUserId(
    userId: string,
    profileData: UpdateProfileDto,
    authUserId: string,
  ) {
    const profile = await this.findProfileByUserId(userId);

    await profile.update({
      ...profileData,
      updatedById: authUserId,
    });

    return profile;
  }
}

import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Injectable } from '@nestjs/common';
import { PaginatedDto } from 'src/__common/dto/paginated';
import { BooleanType } from 'src/__common/types/utils';
import { UserNotFound } from 'src/__common/exceptions/user-not-found';
import { UsernameOrPasswordInValid } from 'src/__common/exceptions/username-or-password-invalid';
import { Profile } from './entities/profile';
import { User } from './entities/user';
import { CreateUserDto } from './dto/create-user';
import { UpdateUserDto } from './dto/update-user';
import { ListUserParamsDto } from './dto/list-user';
import { BaseUserDto } from './dto/base-user';

@Injectable()
export class UsersService {
  constructor(
    private sequelize: Sequelize,
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Profile) private profileModel: typeof Profile,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto, {
      include: [this.profileModel],
    });
  }

  async findAll({
    page = 1,
    pageSize = 10,
    withProfile,
  }: ListUserParamsDto): Promise<PaginatedDto<BaseUserDto>> {
    const include = [];
    console.log(withProfile, typeof withProfile);
    if (withProfile === BooleanType.True) {
      include.push(this.profileModel);
    }

    return this.userModel.findAllPaginated({
      page,
      pageSize,
      options: {
        include,
      },
    });
  }

  async findOne(id: string): Promise<BaseUserDto> {
    const user = await this.userModel.findByPk(id, {
      include: [this.profileModel],
    });

    if (user === null) throw new UserNotFound();

    return user.toJSON();
  }

  async update(
    id: string,
    { profile: profileData, ...userData }: UpdateUserDto,
  ) {
    try {
      this.sequelize.transaction(async (t) => {
        const transactionHost = { transaction: t };

        const user = await this.userModel.findByPk(id, {
          include: [this.profileModel],
        });

        if (user === null) throw new UserNotFound();
        const profile = user.profile;

        await Promise.all([
          user.update(userData, transactionHost),
          profile.update(profileData, transactionHost),
        ]);

        return user.toJSON();
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    const user = await this.userModel.findByPk(id, {
      include: [this.profileModel],
    });

    if (user === null) throw new UserNotFound();

    await user.destroy();

    return;
  }

  // Auth
  async checkUsernamePassword(username: string, password: string) {
    const user = await this.userModel.findByCredential(username);

    if (!user) throw new UsernameOrPasswordInValid();

    const isPasswordValid = await user.checkPassword(password);

    if (!isPasswordValid) throw new UsernameOrPasswordInValid();

    return user;
  }
}

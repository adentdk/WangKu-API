import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user';
import { UpdateUserDto } from './dto/update-user';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user';
import { ListUserParamsDto } from './dto/list-user';
import { PaginatedDto } from 'src/__common/dto/paginated';
import { BaseUserDto } from './dto/base-user';
import { Profile } from './entities/profile';
import { BooleanType } from 'src/__common/types/utils';
import { Sequelize } from 'sequelize-typescript';
import { Response } from 'express';

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

    if (user === null) throw new BadRequestException('user not found');

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

        if (user === null) throw new BadRequestException('user not found');
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

  async remove(id: string, res: Response) {
    const user = await this.userModel.findByPk(id, {
      include: [this.profileModel],
    });

    if (user === null) throw new BadRequestException('user not found');

    await user.destroy();

    return res.status(HttpStatus.NO_CONTENT).end();
  }
}

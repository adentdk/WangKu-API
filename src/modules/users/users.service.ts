import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';

import { PaginatedResponseDto } from 'shared/dto/paginated-response.dto';
import { RoleUserExist } from 'shared/exceptions/role-user-exist';
import { UserNotFound } from 'shared/exceptions/user-not-found';
import { BooleanType } from 'shared/types/utils';

import { Profile } from 'modules/profiles/profiles.entity';
import { RolesService } from 'modules/roles/roles.service';

import { AddRoleUserDto } from './dto/add-role-user.dto';
import { BaseUserDto } from './dto/base-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ListUserParamsDto } from './dto/list-user-params.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly sequelize: Sequelize,
    private readonly roleService: RolesService,
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Profile) private profileModel: typeof Profile,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto as any, {
      include: [this.profileModel],
      returning: ['id', 'email', 'phoneNumber', 'profile', 'username'],
    });
  }

  async findAll({
    page,
    pageSize,
    withProfile,
  }: ListUserParamsDto): Promise<PaginatedResponseDto<BaseUserDto>> {
    const include = [];
    if (withProfile === BooleanType.True) {
      include.push(this.profileModel);
    }

    return this.userModel.findAllPaginated({
      page,
      pageSize,
      options: {
        include,
        attributes: {
          exclude: ['password'],
        },
      },
    });
  }

  async findOne(id: string) {
    const user = await this.userModel.findByPk(id, {
      include: [this.profileModel],
      attributes: {
        exclude: ['password'],
      },
    });

    if (user === null) throw new UserNotFound();

    return user.toJSON();
  }

  async update(
    id: string,
    { profile: profileData, ...userData }: UpdateUserDto,
  ) {
    try {
      const user = await this.sequelize.transaction(async (t) => {
        const transactionHost = { transaction: t };

        const user = await this.userModel.findByPk(id, {
          include: [this.profileModel],
          attributes: {
            exclude: ['password'],
          },
        });

        if (user === null) throw new UserNotFound();
        const profile = user.profile;

        await Promise.all([
          user.update(userData, transactionHost),
          profile.update(profileData, transactionHost),
        ]);

        return user;
      });

      return user.toJSON();
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

  async findProfile(userId: string) {
    const profile = await this.profileModel.findByUserId({ userId });
    console.log(profile.fullName, 'halo', userId);
    if (profile === null) throw new UserNotFound();

    return profile.toJSON();
  }

  async checkUsernamePassword(
    username: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.userModel.findByCredential(username);

    if (!user) return null;

    const isPasswordValid = await user.checkPassword(password);

    if (!isPasswordValid) return null;

    return user;
  }

  async addRoleUser(userId: string, { roleId }: AddRoleUserDto) {
    const [user, role] = await Promise.all([
      this.userModel.findByPk(userId),
      this.roleService.findOne(roleId),
    ]);

    if (!user) throw new UserNotFound();

    const addRole = await user.$add('roles', role.id);

    if (!addRole) throw new RoleUserExist();

    const roles = await user.$get('roles');

    return roles;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Attributes, FindOptions } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

import { PaginatedResponseDto } from 'shared/dto/paginated-response.dto';
import { RoleUserExist } from 'shared/exceptions/role-user-exist';
import { UserNotFound } from 'shared/exceptions/user-not-found';
import { BooleanType } from 'shared/types/utils';

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
  ) {}

  async create({ profile: profileData, ...userData }: CreateUserDto) {
    try {
      const user = await this.sequelize.transaction(async (t) => {
        const transactionHost = { transaction: t };
        const user = await this.userModel.create(
          { ...userData, profile: profileData as any },
          {
            include: ['profile'],
            ...transactionHost,
          },
        );

        return user;
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  async findAll({
    page,
    pageSize,
    withProfile,
    order = 'asc',
    orderBy = 'createdAt',
  }: ListUserParamsDto): Promise<PaginatedResponseDto<BaseUserDto>> {
    const include = [];
    if (withProfile === BooleanType.True) {
      include.push('profile');
    }

    return this.userModel.findAllPaginated({
      page,
      pageSize,
      order,
      orderBy,
      options: {
        include,
        attributes: {
          exclude: ['password'],
        },
      },
    });
  }

  async findOne(
    id: string,
    options?: Omit<FindOptions<Attributes<User>>, 'where'>,
  ) {
    const user = await this.userModel.findByPk(id, {
      include: ['profile'],
      attributes: {
        exclude: ['password'],
      },
      ...options,
    });

    if (user === null) throw new UserNotFound();

    return user;
  }

  async update(
    id: string,
    { profile: profileData, ...userData }: UpdateUserDto,
  ) {
    try {
      const user = await this.sequelize.transaction(async (t) => {
        const transactionHost = { transaction: t };

        const user = await this.userModel.findByPk(id, {
          include: ['profile'],
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

      return user;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    const user = await this.userModel.findByPk(id);

    if (user === null) throw new UserNotFound();

    await user.destroy();

    return;
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

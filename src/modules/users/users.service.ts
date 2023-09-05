import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Injectable } from '@nestjs/common';
import { PaginatedResponseDto } from 'shared/dto/paginated-response.dto';
import { BooleanType } from 'shared/types/utils';
import { UserNotFound } from 'shared/exceptions/user-not-found';
import { Profile } from 'modules/profiles/profiles.entity';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ListUserParamsDto } from './dto/list-user-params.dto';
import { BaseUserDto } from './dto/base-user.dto';
import { BaseProfileDto } from './dto/base-profile.dto';
import { AddRoleUserDto } from './dto/add-role-user.dto';
import { RolesService } from 'modules/roles/roles.service';
import { RoleUserExist } from 'shared/exceptions/role-user-exist';

@Injectable()
export class UserService {
  constructor(
    private readonly sequelize: Sequelize,
    private readonly roleService: RolesService,
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Profile) private profileModel: typeof Profile,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto, {
      include: [this.profileModel],
      returning: ['id', 'email', 'phoneNumber', 'profile', 'username'],
    });
  }

  async findAll({
    page = 1,
    pageSize = 10,
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

  async findOne(id: string): Promise<BaseUserDto> {
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

  async findProfile(userId: string): Promise<BaseProfileDto> {
    const profile = await this.profileModel.findByUserId({ userId });

    if (profile === null) throw new UserNotFound();

    return profile.toJSON();
  }

  async checkUsernamePassword(
    username: string,
    password: string,
  ): Promise<BaseUserDto | null> {
    const user = await this.userModel.findByCredential(username);

    if (!user) return null;

    const isPasswordValid = await user.checkPassword(password);

    if (!isPasswordValid) return null;

    return user.toJSON();
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

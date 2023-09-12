import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Attributes, Op, UniqueConstraintError, WhereOptions } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

import { BadRequest } from 'shared/exceptions/bad-request';
import { RoleNotFound } from 'shared/exceptions/role-not-found';

import { Permission } from 'modules/permissions/permissions.entity';

import { CreateRoleDto } from './dto/create-role.dto';
import { ListRoleParamsDto } from './dto/list-role-params.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './roles.entity';

@Injectable()
export class RolesService {
  constructor(
    private readonly sequelize: Sequelize,
    @InjectModel(Role) private roleModel: typeof Role,
    @InjectModel(Permission) private permissionModel: typeof Permission,
  ) {}
  async create(
    { permissionIds, ...roleData }: CreateRoleDto,
    authUserId: string,
  ) {
    try {
      let permissions = [];

      if (permissionIds?.length) {
        permissions = await this.permissionModel.findAll({
          where: { id: { [Op.in]: permissionIds } },
        });

        if (permissionIds.length !== permissions.length) throw new BadRequest();
      }

      const role = await this.sequelize.transaction(async (t) => {
        const transactionHost = { transaction: t };
        const role = await this.roleModel.create(
          { ...roleData, createdById: authUserId },
          transactionHost,
        );

        if (permissionIds.length) {
          await role.$set('permissions', permissionIds, transactionHost);
        }

        return role;
      });

      return role;
    } catch (error: any) {
      if (error?.name?.includes(UniqueConstraintError.name)) {
        throw new BadRequest(error?.errors?.[0]?.message);
      }

      throw error;
    }
  }

  findAll({
    search,
    page,
    pageSize,
    order = 'desc',
    orderBy = 'createdAt',
  }: ListRoleParamsDto) {
    const whereOptions: WhereOptions<Attributes<Role>> = {};
    if (search)
      whereOptions.name = {
        [Op.iLike]: `%${search}%`,
      };
    return this.roleModel.findAllPaginated({
      page,
      pageSize,
      order,
      orderBy,
      options: {
        where: whereOptions,
      },
    });
  }

  async findOne(id: number) {
    const role = await this.roleModel.findByPk(id);

    if (role === null) throw new RoleNotFound();

    return role;
  }

  async update(
    id: number,
    { permissionIds, ...roleData }: UpdateRoleDto,
    authUserId: string,
  ) {
    try {
      const role = await this.roleModel.findByPk(id);
      if (!role) throw new RoleNotFound();
      let permissions = [];

      if (permissionIds?.length) {
        permissions = await this.permissionModel.findAll({
          where: { id: { [Op.in]: permissionIds } },
        });

        if (permissionIds.length !== permissions.length) throw new BadRequest();
      }

      await this.sequelize.transaction(async (t) => {
        const transactionHost = { transaction: t };
        await role.update(
          { ...roleData, updatedById: authUserId },
          transactionHost,
        );

        if (permissionIds.length) {
          await role.$set('permissions', permissionIds, transactionHost);
        }
      });

      return role;
    } catch (error) {
      throw error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}

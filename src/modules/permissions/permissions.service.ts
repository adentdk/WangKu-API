import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Attributes, Op, WhereOptions } from 'sequelize';

import { PermissionNotFound } from 'shared/exceptions/permission-not-found';

import { CreatePermissionDto } from './dto/create-permission.dto';
import { ListPermissionParamsDto } from './dto/list-permission-params.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './permissions.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel(Permission) private permissionModel: typeof Permission,
  ) {}
  create(createPermission: CreatePermissionDto) {
    return this.permissionModel.create(createPermission);
  }

  findAll({ page, pageSize, search }: ListPermissionParamsDto) {
    const whereOptions: WhereOptions<Attributes<Permission>> = {};
    if (search) {
      whereOptions.name = {
        [Op.iLike]: `%${search}%`,
      };
    }

    return this.permissionModel.findAllPaginated({
      page,
      pageSize,
      options: {
        where: whereOptions,
      },
    });
  }

  async findOne(id: number) {
    const permission = await this.permissionModel.findByPk(id);
    if (!permission) throw new PermissionNotFound();
    return permission.toJSON();
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    const permission = await this.permissionModel.findByPk(id);
    if (!permission) throw new PermissionNotFound();

    await permission.update(updatePermissionDto);

    return permission.toJSON();
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }
}

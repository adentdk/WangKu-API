import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { PermissionNotFound } from 'shared/exceptions/permission-not-found';

import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './permissions.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel(Permission) private permissionModel: typeof Permission,
  ) {}
  create(createPermission: CreatePermissionDto) {
    return 'This action adds a new permission';
  }

  findAll() {
    return `This action returns all permissions`;
  }

  async findOne(id: number) {
    const permission = await this.permissionModel.findByPk(id);
    if (!permission) throw new PermissionNotFound();
    return permission.toJSON();
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return `This action updates a #${id} permission`;
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }
}

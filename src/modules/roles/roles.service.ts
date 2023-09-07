import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { RoleNotFound } from 'shared/exceptions/role-not-found';

import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './roles.entity';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleModel: typeof Role) {}
  create(createRoleDto: CreateRoleDto) {
    return 'This action adds a new role';
  }

  findAll() {
    return `This action returns all roles`;
  }

  async findOne(id: number) {
    const role = await this.roleModel.findByPk(id);
    if (!role) throw new RoleNotFound();
    return role.toJSON();
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}

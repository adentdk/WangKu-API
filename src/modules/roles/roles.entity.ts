import {
  AutoIncrement,
  BelongsToMany,
  Column,
  DataType,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { Permission } from 'modules/permissions/permissions.entity';
import { RolePermission } from 'modules/role-permission/role-permission.entity';
import { BaseModel } from 'shared/base-model';

import { BaseRoleDto } from './dto/base-role.dto';
import { CreateRoleDto } from './dto/create-role.dto';

@Table({
  name: {
    singular: 'role',
    plural: 'roles',
  },
  paranoid: true,
})
export class Role extends BaseModel<BaseRoleDto, CreateRoleDto, number> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  id: number;

  @Column({
    type: DataType.STRING(64),
    unique: true,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: true,
    defaultValue: null,
  })
  description: string | null;

  @BelongsToMany(() => Permission, {
    through: { model: () => RolePermission },
  })
  permissions: Permission[];
}

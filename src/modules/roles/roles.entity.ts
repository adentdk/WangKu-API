import { InferAttributes, InferCreationAttributes } from 'sequelize';
import {
  AutoIncrement,
  BelongsToMany,
  Column,
  DataType,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { BaseModel } from 'shared/base-model';
import { ErrorCodes } from 'shared/types/error-code';

import { Permission } from 'modules/permissions/permissions.entity';
import { RolePermission } from 'modules/role-permission/role-permission.entity';

@Table({
  name: {
    singular: 'role',
    plural: 'roles',
  },
  paranoid: true,
})
export class Role extends BaseModel<
  InferAttributes<Role>,
  InferCreationAttributes<Role, { omit: 'permissions' | 'id' }>
> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  id: number;

  @Column({
    type: DataType.STRING(64),
    unique: {
      name: 'RoleNameUnique',
      msg: ErrorCodes.RoleNameUniqueError,
    },
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

import { InferAttributes, InferCreationAttributes } from 'sequelize';
import {
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { BaseModel } from 'shared/base-model';
import { ErrorCodes } from 'shared/types/error-code';

import { Menu } from 'modules/menus/menus.entity';
import { Permission } from 'modules/permissions/permissions.entity';
import { RoleMenu } from 'modules/role-menu/role-menu.entity';
import { RolePermission } from 'modules/role-permission/role-permission.entity';
import { User } from 'modules/users/user.entity';

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

  @BelongsToMany(() => Menu, {
    through: { model: () => RoleMenu },
  })
  menus: Menu[];

  @ForeignKey(() => User)
  @Column({ type: DataType.STRING(36), onDelete: 'SET NULL' })
  createdById: string;

  @BelongsTo(() => User, {
    foreignKey: 'createdById',
  })
  createdBy: User;

  @ForeignKey(() => User)
  @Column({ type: DataType.STRING(36), onDelete: 'SET NULL' })
  updatedById: string;

  @BelongsTo(() => User, {
    foreignKey: 'updatedById',
  })
  updatedBy: User;

  @ForeignKey(() => User)
  @Column({ type: DataType.STRING(36), onDelete: 'SET NULL' })
  deletedById: string;

  @BelongsTo(() => User, {
    foreignKey: 'deletedById',
  })
  deletedBy: User;
}

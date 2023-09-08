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

import { RolePermission } from 'modules/role-permission/role-permission.entity';
import { Role } from 'modules/roles/roles.entity';
import { User } from 'modules/users/user.entity';

@Table({
  name: {
    singular: 'permission',
    plural: 'permissions',
  },
  paranoid: true,
})
export class Permission extends BaseModel<
  InferAttributes<Permission>,
  InferCreationAttributes<Permission, { omit: 'roles' }>
> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  id: number;

  @Column({
    type: DataType.STRING(64),
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  description: string;

  @Column({
    type: DataType.STRING(32),
    allowNull: false,
  })
  action: string;

  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
  })
  subject: string;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
    defaultValue: null,
  })
  conditions?: any;

  @BelongsToMany(() => Role, {
    through: { model: () => RolePermission },
  })
  roles: Role[];

  @ForeignKey(() => User)
  @Column(DataType.STRING(36))
  createdById: string;

  @BelongsTo(() => User, {
    foreignKey: 'createdById',
  })
  createdBy: User;

  @ForeignKey(() => User)
  @Column(DataType.STRING(36))
  updatedById: string;

  @BelongsTo(() => User, {
    foreignKey: 'updatedById',
  })
  updatedBy: User;

  @ForeignKey(() => User)
  @Column(DataType.STRING(36))
  deletedById: string;

  @BelongsTo(() => User, {
    foreignKey: 'deletedById',
  })
  deletedBy: User;
}

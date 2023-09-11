import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { Permission } from 'modules/permissions/permissions.entity';
import { Role } from 'modules/roles/roles.entity';

@Table({
  name: {
    singular: 'role_permission',
    plural: 'role_permissions',
  },
  timestamps: false,
})
export class RolePermission extends Model {
  @BelongsTo(() => Permission)
  permission!: Permission;

  @ForeignKey(() => Permission)
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  permissionId!: number;

  @BelongsTo(() => Role)
  role!: Role;

  @ForeignKey(() => Role)
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  roleId!: number;
}

import {
  Table,
  Model,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  Column,
  DataType,
} from 'sequelize-typescript';
import { Role } from 'modules/roles/roles.entity';
import { Permission } from 'modules/permissions/permissions.entity';

@Table({
  name: {
    singular: 'role_permission',
    plural: 'role_permissions',
  },
  timestamps: false,
})
export class RolePermission extends Model {
  @BelongsTo(() => Permission)
  apiPermission!: Permission;

  @ForeignKey(() => Permission)
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  apiPermissionId!: number;

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

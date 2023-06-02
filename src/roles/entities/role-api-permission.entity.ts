import {
  Table,
  Model,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  Column,
} from 'sequelize-typescript';
import { Role } from './role.entity';
import { ApiPermission } from './api-permission.entity';

@Table({
  name: {
    singular: 'role_api_permission',
    plural: 'role_api_permissions',
  },
  timestamps: false,
})
export class RoleApiPermission extends Model {
  @BelongsTo(() => ApiPermission)
  apiPermission!: ApiPermission;

  @ForeignKey(() => ApiPermission)
  @PrimaryKey
  @Column
  apiPermissionId!: number;

  @BelongsTo(() => Role)
  role!: Role;

  @ForeignKey(() => Role)
  @PrimaryKey
  @Column
  roleId!: number;
}

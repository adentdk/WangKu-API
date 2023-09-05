import {
  AutoIncrement,
  BelongsToMany,
  Column,
  DataType,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { BaseModel } from 'shared/base-model';
import { BasePermissionDto } from '../dto/base-permission.dto';
import { Role } from './role.entity';
import { RolePermission } from './role-permission.entity';
import { CreatePermissionDto } from '../dto/create-permission.dto';

@Table({
  name: {
    singular: 'permission',
    plural: 'permissions',
  },
  paranoid: true,
})
export class Permission extends BaseModel<
  BasePermissionDto,
  CreatePermissionDto,
  number
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
}

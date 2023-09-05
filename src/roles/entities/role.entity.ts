import {
  AutoIncrement,
  BelongsToMany,
  Column,
  DataType,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { BaseModel } from 'src/__common/base-model';
import { Permission } from './permission.entity';
import { RolePermission } from './role-permission.entity';
import { CreateRoleDto } from '../dto/create-role.dto';
import { BaseRoleDto } from '../dto/base-role.dto';

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

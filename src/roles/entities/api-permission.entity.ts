import {
  AutoIncrement,
  BelongsToMany,
  Column,
  DataType,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { BaseModel } from 'src/__common/base-model';
import { BaseApiPermissionDto } from '../dto/base-api-permission.dto';
import { Role } from './role.entity';
import { RoleApiPermission } from './role-api-permission.entity';
import { CreateApiPermissionDto } from '../dto/create-api-permission.dto';

@Table({
  name: {
    singular: 'api_permission',
    plural: 'api_permissions',
  },
  paranoid: true,
})
export class ApiPermission extends BaseModel<
  BaseApiPermissionDto,
  CreateApiPermissionDto,
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
    unique: true,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
  })
  entity: string;

  @BelongsToMany(() => Role, {
    through: { model: () => RoleApiPermission },
  })
  roles: Role[];
}

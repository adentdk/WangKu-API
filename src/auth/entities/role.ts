import { Column, DataType, Table } from 'sequelize-typescript';
import { BaseModel } from 'src/__common/dto/base-model';
import { BaseRoleDto } from '../dto/base-role';
import { CreateRoleDto } from '../dto/create-role';

@Table({
  name: {
    singular: 'role',
    plural: 'roles',
  },
  paranoid: true,
})
export class Role extends BaseModel<BaseRoleDto, CreateRoleDto> {
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
}

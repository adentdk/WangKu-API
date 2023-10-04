import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { ObjectType } from 'shared/types/utils';

import { Menu } from 'modules/menus/menus.entity';
import { Role } from 'modules/roles/roles.entity';

@Table({
  name: {
    singular: 'role_user',
    plural: 'role_users',
  },
  timestamps: false,
})
export class RoleMenu extends Model {
  @BelongsTo(() => Menu)
  menu!: Menu;

  @ForeignKey(() => Menu)
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
  })
  menuId!: number;

  @BelongsTo(() => Role)
  role!: Role;

  @ForeignKey(() => Role)
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
  })
  roleId!: number;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
  })
  detail!: ObjectType;
}

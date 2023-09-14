import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { Role } from 'modules/roles/roles.entity';
import { User } from 'modules/users/user.entity';

@Table({
  name: {
    singular: 'role_user',
    plural: 'role_users',
  },
  timestamps: false,
})
export class RoleUser extends Model {
  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => User)
  @PrimaryKey
  @Column({
    type: DataType.STRING(36),
    allowNull: false,
    onDelete: 'CASCADE',
  })
  userId!: number;

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
}

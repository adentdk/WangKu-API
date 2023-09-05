import {
  Table,
  Model,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  Column,
  DataType,
} from 'sequelize-typescript';
import { User } from './user.entity';
import { Role } from 'modules/roles/entities/role.entity';

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
  })
  userId!: number;

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

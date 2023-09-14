import { InferAttributes, InferCreationAttributes, UUIDV4 } from 'sequelize';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  IsUUID,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { BaseModel } from 'shared/base-model';
import { IconType } from 'shared/types/general';
import { TransactionAccountType } from 'shared/types/transaction';

import { User } from 'modules/users/user.entity';

@Table({
  name: {
    singular: 'transaction_account',
    plural: 'transaction_accounts',
  },
  paranoid: true,
})
export class TransactionAccount extends BaseModel<
  InferAttributes<TransactionAccount>,
  InferCreationAttributes<TransactionAccount>
> {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    type: DataType.STRING(36),
    defaultValue: UUIDV4,
  })
  id: string;

  @Column({
    type: DataType.STRING(32),
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.SMALLINT,
    allowNull: false,
  })
  type: TransactionAccountType;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  icon: string;

  @Column({
    type: DataType.SMALLINT,
    allowNull: true,
  })
  iconType: IconType;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  default: boolean;

  @Column({
    type: DataType.STRING(3),
    allowNull: false,
  })
  currencyCode: string;

  @Column({
    type: DataType.DECIMAL(20, 4),
    allowNull: false,
  })
  currentBallance: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.STRING(36), allowNull: false, onDelete: 'CASCADE' })
  userId: string;

  @BelongsTo(() => User, {
    foreignKey: 'userId',
  })
  user: User;

  @ForeignKey(() => User)
  @Column({ type: DataType.STRING(36), onDelete: 'SET NULL' })
  createdById: string;

  @BelongsTo(() => User, {
    foreignKey: 'createdById',
  })
  createdBy: User;

  @ForeignKey(() => User)
  @Column({ type: DataType.STRING(36), onDelete: 'SET NULL' })
  updatedById: string;

  @BelongsTo(() => User, {
    foreignKey: 'updatedById',
  })
  updatedBy: User;

  @ForeignKey(() => User)
  @Column({ type: DataType.STRING(36), onDelete: 'SET NULL' })
  deletedById: string;

  @BelongsTo(() => User, {
    foreignKey: 'deletedById',
  })
  deletedBy: User;
}

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
import { Debtor } from 'shared/types/transaction';

import { TransactionCategory } from 'modules/transaction-categories/transaction-categories.entity';
import { User } from 'modules/users/user.entity';

@Table({
  name: {
    singular: 'transaction_debt',
    plural: 'transaction_debts',
  },
  paranoid: true,
})
export class TransactionDebt extends BaseModel<
  InferAttributes<TransactionDebt>,
  InferCreationAttributes<TransactionDebt>
> {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    type: DataType.STRING(36),
    defaultValue: UUIDV4,
  })
  id: string;

  @Column({
    type: DataType.STRING(3),
    allowNull: false,
  })
  currencyCode: string;

  @Column({
    type: DataType.DECIMAL(20, 4),
    allowNull: false,
  })
  amount: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  date: string;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
  })
  debtor: Debtor;

  @ForeignKey(() => TransactionCategory)
  @Column(DataType.STRING(36))
  transactionCategoryId: string;

  @BelongsTo(() => TransactionCategory, {
    foreignKey: 'transactionCategoryId',
  })
  transactionCategory: TransactionCategory;

  @ForeignKey(() => User)
  @Column(DataType.STRING(36))
  userId: string;

  @BelongsTo(() => User, {
    foreignKey: 'userId',
  })
  user: User;

  @ForeignKey(() => User)
  @Column(DataType.STRING(36))
  createdById: string;

  @BelongsTo(() => User, {
    foreignKey: 'createdById',
  })
  createdBy: User;

  @ForeignKey(() => User)
  @Column(DataType.STRING(36))
  updatedById: string;

  @BelongsTo(() => User, {
    foreignKey: 'updatedById',
  })
  updatedBy: User;

  @ForeignKey(() => User)
  @Column(DataType.STRING(36))
  deletedById: string;

  @BelongsTo(() => User, {
    foreignKey: 'deletedById',
  })
  deletedBy: User;
}

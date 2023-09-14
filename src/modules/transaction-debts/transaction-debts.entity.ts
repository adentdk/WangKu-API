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
  debtorJSON: Debtor;

  @ForeignKey(() => User)
  @Column({ type: DataType.STRING(36), allowNull: false, onDelete: 'CASCADE' })
  debtorId: string;

  @BelongsTo(() => User, {
    foreignKey: 'debtorId',
  })
  debtor: User;

  @ForeignKey(() => TransactionCategory)
  @Column({ type: DataType.STRING(36), allowNull: false, onDelete: 'CASCADE' })
  transactionCategoryId: string;

  @BelongsTo(() => TransactionCategory, {
    foreignKey: 'transactionCategoryId',
  })
  transactionCategory: TransactionCategory;

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

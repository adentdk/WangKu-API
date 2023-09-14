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
import { SimpleUser } from 'shared/dto/simple-user.dto';
import { TransactionType } from 'shared/types/transaction';

import { Event } from 'modules/events/events.entity';
import { TransactionAccount } from 'modules/transaction-accounts/transaction-accounts.entity';
import { TransactionCategory } from 'modules/transaction-categories/transaction-categories.entity';
import { TransactionCredit } from 'modules/transaction-credits/transaction-credits.entity';
import { TransactionDebt } from 'modules/transaction-debts/transaction-debts.entity';
import { User } from 'modules/users/user.entity';

@Table({
  name: {
    singular: 'transaction',
    plural: 'transactions',
  },
  paranoid: true,
})
export class Transaction extends BaseModel<
  InferAttributes<Transaction>,
  InferCreationAttributes<Transaction>
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
    type: DataType.SMALLINT,
    allowNull: false,
  })
  type: TransactionType;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  notes: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isExcludeFromReport: boolean;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  date: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
  })
  remindAt: string;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
  })
  withUserJSON: SimpleUser[];

  @ForeignKey(() => User)
  @Column({ type: DataType.STRING(36), allowNull: false })
  userId: string;

  @BelongsTo(() => User, {
    foreignKey: 'userId',
  })
  user: User;

  @ForeignKey(() => TransactionCategory)
  @Column({ type: DataType.STRING(36), allowNull: false })
  transactionCategoryId: string;

  @BelongsTo(() => TransactionCategory, {
    foreignKey: 'transactionCategoryId',
  })
  transactionCategory: TransactionCategory;

  @ForeignKey(() => TransactionAccount)
  @Column({ type: DataType.STRING(36), allowNull: true })
  transactionAccountId: string;

  @BelongsTo(() => TransactionAccount, {
    foreignKey: 'transactionAccountId',
  })
  transactionAccount: TransactionAccount;

  @ForeignKey(() => TransactionAccount)
  @Column({ type: DataType.STRING(36), allowNull: true })
  originTransactionAccountId: string;

  @BelongsTo(() => TransactionAccount, {
    foreignKey: 'originTransactionAccountId',
  })
  originTransactionAccount: TransactionAccount;

  @ForeignKey(() => TransactionAccount)
  @Column({ type: DataType.STRING(36), allowNull: true })
  destinationTransactionAccountId: string;

  @BelongsTo(() => TransactionAccount, {
    foreignKey: 'destinationTransactionAccountId',
  })
  destinationTransactionAccount: TransactionAccount;

  @ForeignKey(() => Event)
  @Column({ type: DataType.STRING(36), allowNull: true })
  eventId: string;

  @BelongsTo(() => Event, { foreignKey: 'eventId' })
  event: Event;

  @ForeignKey(() => TransactionDebt)
  @Column({ type: DataType.STRING(36), allowNull: true })
  transactionDebtId: string;

  @BelongsTo(() => TransactionDebt, {
    foreignKey: 'transactionDebtId',
  })
  transactionDebt: TransactionDebt;

  @ForeignKey(() => TransactionCredit)
  @Column({ type: DataType.STRING(36), allowNull: true })
  transactionCreditId: string;

  @BelongsTo(() => TransactionCredit, { foreignKey: 'transactionCreditId' })
  transactionCredit: TransactionCredit;

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

  @BelongsTo(() => User, { foreignKey: 'updatedById' })
  updatedBy: User;

  @ForeignKey(() => User)
  @Column(DataType.STRING(36))
  deletedById: string;

  @BelongsTo(() => User, { foreignKey: 'deletedById' })
  deletedBy: User;
}

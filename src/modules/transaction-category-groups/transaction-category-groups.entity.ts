import { InferAttributes, InferCreationAttributes, UUIDV4 } from 'sequelize';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  IsUUID,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { BaseModel } from 'shared/base-model';
import { IconType } from 'shared/types/general';
import { TransactionType } from 'shared/types/transaction';

import { TransactionCategory } from 'modules/transaction-categories/transaction-categories.entity';
import { User } from 'modules/users/user.entity';

@Table({
  name: {
    singular: 'transaction_category_group',
    plural: 'transaction_category_groups',
  },
  paranoid: true,
})
export class TransactionCategoryGroup extends BaseModel<
  InferAttributes<TransactionCategoryGroup>,
  InferCreationAttributes<TransactionCategoryGroup>
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
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.SMALLINT,
    allowNull: false,
  })
  type: TransactionType;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  tNameKey: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  tDescKey: string;

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

  @HasMany(() => TransactionCategory, 'transactionCategoryGroupId')
  transactionCategories: TransactionCategory[];

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

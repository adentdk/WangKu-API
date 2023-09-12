import { InferAttributes, InferCreationAttributes, UUIDV4 } from 'sequelize';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

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
export class TransactionCategoryGroup extends Model<
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
    type: DataType.INTEGER,
    allowNull: false,
  })
  type: TransactionType;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  icon: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  iconType: IconType;

  @HasMany(() => TransactionCategory, 'transactionCategoryGroupId')
  transactionCategories: TransactionCategory[];

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

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

import { User } from 'modules/users/user.entity';

@Table({
  name: {
    singular: 'event',
    plural: 'events',
  },
  paranoid: true,
})
export class Event extends BaseModel<
  InferAttributes<Event>,
  InferCreationAttributes<Event>
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
    type: DataType.DATEONLY,
    allowNull: false,
  })
  start_date: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  end_date: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING(36),
    allowNull: false,
    onDelete: 'CASCADE',
  })
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

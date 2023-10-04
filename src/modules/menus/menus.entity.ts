import { InferAttributes, InferCreationAttributes } from 'sequelize';
import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { BaseModel } from 'shared/base-model';
import { IconType } from 'shared/types/general';

import { User } from 'modules/users/user.entity';

@Table({
  name: {
    singular: 'menu',
    plural: 'menus',
  },
  paranoid: true,
})
export class Menu extends BaseModel<
  InferAttributes<Menu>,
  InferCreationAttributes<Menu>
> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  id: number;

  @Column({
    type: DataType.STRING(62),
    allowNull: false,
  })
  identifier: string;

  @Column({
    type: DataType.STRING(32),
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING(62),
    allowNull: true,
  })
  href: string | null;

  @Column({
    type: DataType.SMALLINT,
    allowNull: true,
  })
  iconType: IconType | null;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  icon: string | null;

  @ForeignKey(() => Menu)
  @Column({ type: DataType.INTEGER, allowNull: true, onDelete: 'CASCADE' })
  parentId: number;

  @BelongsTo(() => Menu, {
    foreignKey: 'parentId',
    as: 'parent',
  })
  parent: Menu;

  @HasMany(() => Menu, 'parentId')
  childrens: Menu[];

  @ForeignKey(() => User)
  @Column({ type: DataType.STRING(36), allowNull: true, onDelete: 'CASCADE' })
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

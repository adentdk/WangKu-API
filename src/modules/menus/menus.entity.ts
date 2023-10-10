import { InferAttributes, InferCreationAttributes } from 'sequelize';
import {
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { BaseModel } from 'shared/base-model';
import { IconType } from 'shared/types/general';

import { RoleMenu } from 'modules/role-menu/role-menu.entity';
import { Role } from 'modules/roles/roles.entity';
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
  InferCreationAttributes<Menu, { omit: 'roleMenu' }>
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

  @Column({
    type: DataType.SMALLINT,
    allowNull: true,
  })
  order: number | null;

  @ForeignKey(() => Menu)
  @Column({ type: DataType.INTEGER, allowNull: true, onDelete: 'CASCADE' })
  parentId: number;

  @BelongsTo(() => Menu, {
    foreignKey: 'parentId',
    as: 'parent',
  })
  parent: Menu;

  @HasMany(() => Menu, 'parentId')
  children: Menu[];

  @BelongsToMany(() => Role, {
    through: { model: () => RoleMenu },
  })
  roles: Menu[];

  @Column(DataType.VIRTUAL)
  get roleMenu() {
    return this.getDataValue('RoleMenu');
  }

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

import { InferAttributes, InferCreationAttributes } from 'sequelize';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { IconType } from 'shared/types/general';

import { IconBundle } from 'modules/icon-bundles/icon-bundles.entity';

@Table({
  name: {
    singular: 'icon',
    plural: 'icons',
  },
  paranoid: false,
  timestamps: false,
})
export class Icon extends Model<
  InferAttributes<Icon>,
  InferCreationAttributes<Icon>
> {
  @Column({ type: DataType.STRING(64), allowNull: false })
  name: string;

  @Column({ type: DataType.SMALLINT, allowNull: false })
  type: IconType;

  @Column({ type: DataType.JSONB })
  tags: string[];

  @Column({ type: DataType.STRING })
  blurhash: string;

  @ForeignKey(() => IconBundle)
  @Column({ type: DataType.INTEGER, allowNull: false })
  iconBundleId: number;

  @BelongsTo(() => IconBundle, {
    foreignKey: 'iconBundleId',
  })
  iconBundle: IconBundle;
}

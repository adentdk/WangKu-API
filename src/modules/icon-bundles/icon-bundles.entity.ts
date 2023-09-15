import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  name: {
    singular: 'icon_bundle',
    plural: 'icon_bundles',
  },
  paranoid: false,
  timestamps: false,
})
export class IconBundle extends Model<
  InferAttributes<IconBundle>,
  InferCreationAttributes<IconBundle>
> {
  @Column({ type: DataType.STRING(64), allowNull: false })
  name: string;

  @Column({ type: DataType.JSONB })
  tags: string[];
}

import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  name: {
    singular: 'currency',
    plural: 'currencies',
  },
  paranoid: false,
  timestamps: false,
  indexes: [{ name: 'currency_code_index', fields: ['code'] }],
})
export class Currency extends Model<
  InferAttributes<Currency>,
  InferCreationAttributes<Currency>
> {
  @Column({
    type: DataType.STRING(64),
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING(3),
    allowNull: false,
    unique: true,
  })
  code: string;

  @Column({
    type: DataType.STRING(32),
    allowNull: false,
  })
  symbol: string;
}

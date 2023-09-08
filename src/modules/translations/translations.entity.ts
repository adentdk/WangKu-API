import { InferAttributes, InferCreationAttributes } from 'sequelize';
import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { BaseModel } from 'shared/base-model';

import { Language } from '../languages/languages.entity';

@Table({
  name: {
    singular: 'translation',
    plural: 'translations',
  },
  paranoid: false,
  timestamps: false,
  indexes: [{ name: 'translation_namespace_index', fields: ['namespace'] }],
})
export class Translation extends BaseModel<
  InferAttributes<Translation>,
  InferCreationAttributes<Translation, { omit: 'language' | 'languageId' }>
> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  id: number;

  @Column({
    type: DataType.STRING(32),
    allowNull: false,
    defaultValue: 'common',
  })
  namespace: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  key: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  value: string;

  @ForeignKey(() => Language)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  languageId: number;

  @BelongsTo(() => Language, 'languageId')
  language: Language;
}

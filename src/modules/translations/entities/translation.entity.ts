import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { BaseTranslationDto } from '../dto/base-translation.dto';
import { CreateTranslationDto } from '../dto/create-translation.dto';
import { Language } from './language.entity';
import { BaseModel } from 'shared/base-model';

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
  BaseTranslationDto,
  CreateTranslationDto,
  number
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

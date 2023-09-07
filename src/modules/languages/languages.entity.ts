import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';

import { Translation } from 'modules/translations/translations.entity';

import { BaseLanguageDto } from './dto/base-language.dto';
import { CreateLanguageDto } from './dto/create-language.dto';

@Table({
  name: {
    singular: 'language',
    plural: 'languages',
  },
  paranoid: false,
  timestamps: false,
  indexes: [{ name: 'language_code_index', fields: ['code'] }],
})
export class Language extends Model<BaseLanguageDto, CreateLanguageDto> {
  @Column({
    type: DataType.STRING(32),
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING(12),
    allowNull: false,
    unique: true,
  })
  code: string;

  @HasMany(() => Translation, 'languageId')
  translations: Translation[];
}

import {
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { BaseTranslationDto } from '../dto/base-translation.dto';
import { CreateTranslationDto } from '../dto/create-translation.dto';
import { Language } from './language.entity';
import { PaginatedResponseDto } from 'src/__common/dto/paginated-response.dto';
import { PaginationHelper } from 'src/__common/helpers/pagination';
import { FindAllPaginated } from 'src/__common/types/sequelize';

@Table({
  name: {
    singular: 'translation',
    plural: 'translations',
  },
  paranoid: false,
  timestamps: false,
  indexes: [{ name: 'translation_namespace_index', fields: ['namespace'] }],
})
export class Translation extends Model<
  BaseTranslationDto,
  CreateTranslationDto
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

  static async findAllPaginated(
    options: FindAllPaginated,
  ): Promise<PaginatedResponseDto> {
    return PaginationHelper.findAllPaginated<Translation>(this, options);
  }
}

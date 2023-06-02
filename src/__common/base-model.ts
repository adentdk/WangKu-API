import { Injectable } from '@nestjs/common';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  IsUUID,
  PrimaryKey,
  Model,
} from 'sequelize-typescript';
import { User } from 'src/users/entities/user.entity';
import { PaginatedResponseDto } from './dto/paginated-response.dto';
import { FindOptions, UUIDV4 } from 'sequelize';
import { PaginationHelper } from './helpers/pagination';

type FindAllPaginated = {
  page: number;
  pageSize: number;
  options?: Omit<FindOptions, 'limit' | 'offset'>;
};

@Injectable()
export class BaseModel<
  V extends object = any,
  C extends object = V,
  ID = string,
> extends Model<V, C> {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    type: DataType.STRING(36),
    defaultValue: UUIDV4,
  })
  id: ID;

  @ForeignKey(() => User)
  @Column(DataType.STRING(36))
  createdById: string;

  @BelongsTo(() => User, {
    foreignKey: 'createdById',
  })
  createdBy: User;

  @ForeignKey(() => User)
  @Column(DataType.STRING(36))
  updatedById: string;

  @BelongsTo(() => User, {
    foreignKey: 'updatedById',
  })
  updatedBy: User;

  @ForeignKey(() => User)
  @Column(DataType.STRING(36))
  deletedById: string;

  @BelongsTo(() => User, {
    foreignKey: 'deletedById',
  })
  deletedBy: User;

  static async findAllPaginated({
    page,
    pageSize,
    options = { where: {} },
  }: FindAllPaginated): Promise<PaginatedResponseDto> {
    const { limit, offset } = PaginationHelper.getLimitOffset(page, pageSize);
    const [users, total] = await Promise.all([
      this.findAll({ limit, offset, ...options }),
      this.count({ where: options.where }),
    ]);
    return {
      total,
      totalPage: PaginationHelper.getTotalPages(total, pageSize),
      results: users.map((user) => user.toJSON()),
    };
  }
}

import { Injectable } from '@nestjs/common';
import {
  // BelongsTo,
  Column,
  DataType,
  // ForeignKey,
  Model,
} from 'sequelize-typescript';

// import { User } from 'modules/users/user.entity';
import { PaginatedResponseDto } from './dto/paginated-response.dto';
import { PaginationHelper } from './helpers/pagination';
import { FindAllPaginated } from './types/sequelize';

@Injectable()
export class BaseModel<
  TModelAttributes = any,
  TCreationAttributes = TModelAttributes,
> extends Model<TModelAttributes, TCreationAttributes> {
  // @ForeignKey(() => User)
  @Column(DataType.STRING(36))
  createdById: string;

  // @BelongsTo(() => User, {
  //   foreignKey: 'createdById',
  // })
  // createdBy: User;

  // @ForeignKey(() => User)
  @Column(DataType.STRING(36))
  updatedById: string;

  // @BelongsTo(() => User, {
  //   foreignKey: 'updatedById',
  // })
  // updatedBy: User;

  // @ForeignKey(() => User)
  @Column(DataType.STRING(36))
  deletedById: string;

  // @BelongsTo(() => User, {
  //   foreignKey: 'deletedById',
  // })
  // deletedBy: User;

  static async findAllPaginated({
    page = 1,
    pageSize = 10,
    options,
  }: FindAllPaginated): Promise<PaginatedResponseDto> {
    return PaginationHelper.findAllPaginated<BaseModel<any>>(this, {
      page,
      pageSize,
      options,
    });
  }
}

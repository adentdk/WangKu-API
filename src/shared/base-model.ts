import { Injectable } from '@nestjs/common';
import { Model } from 'sequelize-typescript';

import { PaginatedResponseDto } from './dto/paginated-response.dto';
import { PaginationHelper } from './helpers/pagination';
import { FindAllPaginated } from './types/sequelize';

@Injectable()
export class BaseModel<
  TModelAttributes = any,
  TCreationAttributes = TModelAttributes,
> extends Model<TModelAttributes, TCreationAttributes> {
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

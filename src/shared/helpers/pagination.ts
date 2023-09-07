import { Model, ModelStatic } from 'sequelize';

import { FindAllPaginated } from 'shared/types/sequelize';

export class PaginationHelper {
  static getLimitOffset(
    page: number,
    pageSize: number,
  ): { limit: number; offset: number } {
    const limit = pageSize;
    const offset = (page - 1) * pageSize;
    return { limit, offset };
  }

  static getTotalPages(totalData: number, pageSize: number) {
    return Math.ceil(totalData / pageSize);
  }

  static async findAllPaginated<M extends Model>(
    model: ModelStatic<M>,
    { page, pageSize, options = { where: {} } }: FindAllPaginated,
  ) {
    const { limit, offset } = this.getLimitOffset(page, pageSize);
    const [results, total] = await Promise.all([
      model.findAll({ limit, offset, ...options }),
      model.count({ where: options.where }),
    ]);
    return {
      total,
      totalPage: this.getTotalPages(total, pageSize),
      results: results.map((user) => user.toJSON()),
    };
  }
}

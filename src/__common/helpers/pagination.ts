import { FindAllPaginated } from '../types/sequelize';
import { Model, ModelStatic } from 'sequelize';

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
    const { limit, offset } = PaginationHelper.getLimitOffset(page, pageSize);
    const [users, total] = await Promise.all([
      model.findAll({ limit, offset, ...options }),
      model.count({ where: options.where }),
    ]);
    return {
      total,
      totalPage: PaginationHelper.getTotalPages(total, pageSize),
      results: users.map((user) => user.toJSON()),
    };
  }
}

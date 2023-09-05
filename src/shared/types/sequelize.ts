import { FindOptions } from 'sequelize';

export type FindAllPaginated = {
  page: number;
  pageSize: number;
  options?: Omit<FindOptions, 'limit' | 'offset'>;
};

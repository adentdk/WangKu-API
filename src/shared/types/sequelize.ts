import { FindOptions } from 'sequelize';

export type FindAllPaginated = {
  page: number;
  pageSize: number;
  order?: string;
  orderBy?: string;
  options?: Omit<FindOptions, 'limit' | 'offset'>;
};

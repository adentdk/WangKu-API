import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Attributes, Op, WhereOptions } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

import { CreateTransactionCategoruGroup } from './dto/create-transaction-category-group.dto';
import { ListTransactionCategoryGroupParams } from './dto/list-transaction-category-group-params.dto';
import { TransactionCategoryGroup } from './transaction-category-groups.entity';

@Injectable()
export class TransactionCategoryGroupsService {
  constructor(
    private readonly sequelize: Sequelize,
    @InjectModel(TransactionCategoryGroup)
    private transactionCategoryGroupModel: typeof TransactionCategoryGroup,
  ) {}

  async create(data: CreateTransactionCategoruGroup, authUserId: string) {
    return this.transactionCategoryGroupModel.create({
      ...data,
      createdById: authUserId,
    });
  }

  findAll({
    search,
    page,
    pageSize,
    order = 'desc',
    orderBy = 'createdAt',
  }: ListTransactionCategoryGroupParams) {
    const whereOptions: WhereOptions<Attributes<TransactionCategoryGroup>> = {};
    if (search)
      whereOptions.name = {
        [Op.iLike]: `%${search}%`,
      };
    return this.transactionCategoryGroupModel.findAllPaginated({
      page,
      pageSize,
      order,
      orderBy,
      options: {
        where: whereOptions,
      },
    });
  }
}

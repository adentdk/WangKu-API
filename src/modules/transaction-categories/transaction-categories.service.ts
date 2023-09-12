import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Attributes, Op, WhereOptions } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

import { BadRequest } from 'shared/exceptions/bad-request';

import { CreateTransactionCategoryDto } from './dto/create-transaction-category.dto';
import { ListTransactionCategoryParams } from './dto/list-transaction-category-params.dto';
import { UpdateTransactionCategoryDto } from './dto/update-transaction-category.dto';
import { TransactionCategory } from './transaction-categories.entity';

@Injectable()
export class TransactionCategoriesService {
  constructor(
    private readonly sequelize: Sequelize,
    @InjectModel(TransactionCategory)
    private transactionCategoryModel: typeof TransactionCategory,
  ) {}

  async create(data: CreateTransactionCategoryDto, authUserId: string) {
    return this.transactionCategoryModel.create({
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
  }: ListTransactionCategoryParams) {
    const whereOptions: WhereOptions<Attributes<TransactionCategory>> = {};
    if (search)
      whereOptions.name = {
        [Op.iLike]: `%${search}%`,
      };
    return this.transactionCategoryModel.findAllPaginated({
      page,
      pageSize,
      order,
      orderBy,
      options: {
        where: whereOptions,
      },
    });
  }

  async findOne(id: string) {
    const category = await this.transactionCategoryModel.findByPk(id);

    if (category === null) throw new BadRequest();

    return category;
  }

  async update(id: string, data: UpdateTransactionCategoryDto, userId: string) {
    try {
      const category = await this.transactionCategoryModel.findByPk(id);

      if (category === null) throw new BadRequest();

      await category.update({ ...data, updatedById: userId });

      return category;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string, userId: string) {
    try {
      const category = await this.transactionCategoryModel.findByPk(id);

      if (category === null) throw new BadRequest();

      await this.sequelize.transaction(async (t) => {
        const transactionHost = { transaction: t };
        await Promise.all([
          category.update(
            {
              deletedById: userId,
            },
            transactionHost,
          ),
          category.destroy({ ...transactionHost }),
        ]);

        return;
      });

      return;
    } catch (error) {
      throw error;
    }
  }
}

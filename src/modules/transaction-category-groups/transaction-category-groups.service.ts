import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Attributes, Op, WhereOptions } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

import { BadRequest } from 'shared/exceptions/bad-request';

import { CreateTransactionCategoryGroupDto } from './dto/create-transaction-category-group.dto';
import { ListTransactionCategoryGroupParams } from './dto/list-transaction-category-group-params.dto';
import { UpdateTransactionCategoryGroupDto } from './dto/update-transaction-category-group.dto';
import { TransactionCategoryGroup } from './transaction-category-groups.entity';

@Injectable()
export class TransactionCategoryGroupsService {
  constructor(
    private readonly sequelize: Sequelize,
    @InjectModel(TransactionCategoryGroup)
    private transactionCategoryGroupModel: typeof TransactionCategoryGroup,
  ) {}

  async create(data: CreateTransactionCategoryGroupDto, authUserId: string) {
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

  async findOne(id: string) {
    const categoryGroup = await this.transactionCategoryGroupModel.findByPk(id);

    if (categoryGroup === null) throw new BadRequest();

    return categoryGroup;
  }

  async update(
    id: string,
    data: UpdateTransactionCategoryGroupDto,
    userId: string,
  ) {
    try {
      const categoryGroup = await this.transactionCategoryGroupModel.findByPk(
        id,
      );

      if (categoryGroup === null) throw new BadRequest();

      await categoryGroup.update({ ...data, updatedById: userId });

      return categoryGroup;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string, userId: string) {
    try {
      const categoryGroup = await this.transactionCategoryGroupModel.findByPk(
        id,
      );

      if (categoryGroup === null) throw new BadRequest();

      await this.sequelize.transaction(async (t) => {
        const transactionHost = { transaction: t };
        await Promise.all([
          categoryGroup.update(
            {
              deletedById: userId,
            },
            transactionHost,
          ),
          categoryGroup.destroy({ ...transactionHost }),
        ]);

        return;
      });

      return;
    } catch (error) {
      throw error;
    }
  }
}

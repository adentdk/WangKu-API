import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Attributes, Op, WhereOptions } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

import { BadRequest } from 'shared/exceptions/bad-request';

import { CreateTransactionAccountDto } from './dto/create-transaction-account.dto';
import { ListTransactionAccountParams } from './dto/list-transaction-account-params.dto';
import { UpdateTransactionAccountDto } from './dto/update-transaction-account.dto';
import { TransactionAccount } from './transaction-accounts.entity';

@Injectable()
export class TransactionAccountsService {
  constructor(
    private readonly sequelize: Sequelize,
    @InjectModel(TransactionAccount)
    private transactionAccountModel: typeof TransactionAccount,
  ) {}

  async create(data: CreateTransactionAccountDto, authUserId: string) {
    return this.transactionAccountModel.create({
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
  }: ListTransactionAccountParams) {
    const whereOptions: WhereOptions<Attributes<TransactionAccount>> = {};
    if (search)
      whereOptions.name = {
        [Op.iLike]: `%${search}%`,
      };
    return this.transactionAccountModel.findAllPaginated({
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
    const account = await this.transactionAccountModel.findByPk(id);

    if (account === null) throw new BadRequest();

    return account;
  }

  async update(id: string, data: UpdateTransactionAccountDto, userId: string) {
    try {
      const account = await this.transactionAccountModel.findByPk(id);

      if (account === null) throw new BadRequest();

      await account.update({ ...data, updatedById: userId });

      return account;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string, userId: string) {
    try {
      const account = await this.transactionAccountModel.findByPk(id);

      if (account === null) throw new BadRequest();

      await this.sequelize.transaction(async (t) => {
        const transactionHost = { transaction: t };
        await Promise.all([
          account.update(
            {
              deletedById: userId,
            },
            transactionHost,
          ),
          account.destroy({ ...transactionHost }),
        ]);

        return;
      });

      return;
    } catch (error) {
      throw error;
    }
  }
}

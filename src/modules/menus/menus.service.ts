import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Attributes, Op, WhereOptions } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

import { BadRequest } from 'shared/exceptions/bad-request';

import { CreateMenuDto } from './dto/create-menu.dto';
import { ListMenuParams } from './dto/list-menu-params.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './menus.entity';

@Injectable()
export class MenusService {
  constructor(
    private readonly sequelize: Sequelize,
    @InjectModel(Menu)
    private menuModel: typeof Menu,
  ) {}

  async create(data: CreateMenuDto, authUserId: string) {
    return this.menuModel.create({
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
  }: ListMenuParams) {
    const whereOptions: WhereOptions<Attributes<Menu>> = {};
    if (search)
      whereOptions.name = {
        [Op.iLike]: `%${search}%`,
      };
    return this.menuModel.findAllPaginated({
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
    const menu = await this.menuModel.findByPk(id);

    if (menu === null) throw new BadRequest();

    return menu;
  }

  async update(id: string, data: UpdateMenuDto, userId: string) {
    try {
      const menu = await this.menuModel.findByPk(id);

      if (menu === null) throw new BadRequest();

      await menu.update({ ...data, updatedById: userId });

      return menu;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string, userId: string) {
    try {
      const menu = await this.menuModel.findByPk(id);

      if (menu === null) throw new BadRequest();

      await this.sequelize.transaction(async (t) => {
        const transactionHost = { transaction: t };
        await Promise.all([
          menu.update(
            {
              deletedById: userId,
            },
            transactionHost,
          ),
          menu.destroy({ ...transactionHost }),
        ]);

        return;
      });

      return;
    } catch (error) {
      throw error;
    }
  }
}

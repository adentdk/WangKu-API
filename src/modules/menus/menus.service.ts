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
    return this.menuModel.create(
      {
        ...data,
        children: data.children?.map(
          (child) =>
            ({
              ...child,
              createdById: authUserId,
            } as any),
        ),
        createdById: authUserId,
      },
      {
        include: ['children'],
      },
    );
  }

  findAll({
    search,
    page,
    pageSize,
    order = 'desc',
    orderBy = 'createdAt',
    parentId,
  }: ListMenuParams) {
    const whereOptions: WhereOptions<Attributes<Menu>> = {};
    if (search) {
      whereOptions.name = {
        [Op.iLike]: `%${search}%`,
      };
    }

    if (parentId !== undefined) {
      if (parentId === 'NULL') {
        whereOptions.parentId = {
          [Op.eq]: null,
        };
      } else whereOptions.parentId = parentId;
    }

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
    const menu = await this.menuModel.findByPk(id, { include: ['children'] });

    if (menu === null) throw new BadRequest();

    return menu;
  }

  async update(
    id: string,
    { children, deletedChildrenIds, ...data }: UpdateMenuDto,
    userId: string,
  ) {
    try {
      const menu = await this.findOne(id);
      await this.sequelize.transaction(async (t) => {
        const transactionHost = { transaction: t };

        const [newChildren, existedChildren] = await Promise.all([
          this.menuModel.bulkCreate(
            children
              .filter((child) => child.id === undefined || child.id === null)
              .map((child) => ({
                name: child.name,
                identifier: child.identifier,
                href: child.href,
              })),
            transactionHost,
          ),
          this.menuModel.findAll({
            where: {
              id: {
                [Op.in]: children
                  .filter((child) => child.id !== undefined)
                  .map((child) => child.id),
              },
            },
          }),
          menu.update(
            {
              ...data,
              updatedById: userId,
            },
            transactionHost,
          ),
          deletedChildrenIds?.length
            ? this.menuModel.destroy({
                force: true,
                where: {
                  id: {
                    [Op.in]: deletedChildrenIds,
                  },
                },
              })
            : Promise.resolve(false),
        ]);

        await Promise.all([
          ...existedChildren.map((child) => {
            const childData = children.find((c) => c.id === child.id);
            return child.update(
              {
                name: childData.name,
                identifier: childData.identifier,
                href: childData.href,
              },
              transactionHost,
            );
          }),
          menu.$set(
            'children',
            [
              ...newChildren.map((child) => child.id),
              ...existedChildren.map((child) => child.id),
            ],
            transactionHost,
          ),
        ]);

        return Promise.resolve(true);
      });

      return menu;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string, userId: string) {
    try {
      const menu = await this.findOne(id);

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

import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cache } from 'cache-manager';
import Handlebars from 'handlebars';

import { PermissionItem } from 'shared/types/general';

import { User } from 'modules/users/user.entity';

import { defineAbilitiesForUser } from './ability';

const USER_PERMISSION_KEY = 'user_permission';

@Injectable()
export class CaslAbilityFactory {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async createForUser(userId: string) {
    const cacheKey = `${USER_PERMISSION_KEY}:${userId}`;

    const permissionCache = await this.cacheManager.get<
      PermissionItem[] | null
    >(cacheKey);

    if (permissionCache !== null)
      return defineAbilitiesForUser(permissionCache);

    const permissions = await this.findPermissionByUserId(userId);
    await this.cacheManager.set(cacheKey, permissions);

    return defineAbilitiesForUser(permissions);
  }

  async findPermissionByUserId(userId: string) {
    const user = await this.userModel.findByPk(userId, {
      attributes: ['id'],
      include: [
        {
          association: 'roles',
          attributes: ['id'],
          include: [
            {
              association: 'permissions',
              attributes: ['name', 'action', 'subject', 'conditions'],
            },
          ],
        },
      ],
    });

    const permissions: PermissionItem[] = [];

    user.roles.forEach((role) => {
      role.permissions.forEach((permission) => {
        const findIndex = permissions.findIndex(
          ([permissionName]) => permissionName === permission.name,
        );
        if (findIndex !== -1) return;
        let conditions: object = null;
        if (permission.conditions) {
          const template = Handlebars.compile(
            JSON.stringify(permission.conditions),
          );
          conditions = JSON.parse(template({ userId }));
        }
        permissions.push([
          permission.name,
          permission.action,
          permission.subject,
          conditions,
        ]);
      });
    });

    return permissions;
  }
}

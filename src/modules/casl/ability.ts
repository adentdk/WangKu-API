import { AbilityBuilder, createMongoAbility } from '@casl/ability';
import Handlebars from 'handlebars';

import { User } from 'modules/users/user.entity';

export const defineAbilitiesForUser = async (userId: string) => {
  const { can, build } = new AbilityBuilder(createMongoAbility);
  const user = await User.findByPk(userId, {
    attributes: ['id'],
    include: [
      {
        association: 'roles',
        attributes: ['id'],
        include: [
          {
            association: 'permissions',
            attributes: ['action', 'subject', 'conditions'],
          },
        ],
      },
    ],
  });

  const permissions = [];
  user.roles.forEach((role) => {
    role.permissions.forEach((permission) => {
      const findIndex = permissions.findIndex(
        (permissionName) => permissionName === permission.name,
      );
      if (findIndex !== -1) return;
      permissions.push(permission.name);
      let conditions: any;
      if (permission.conditions) {
        conditions = Handlebars.compile(JSON.stringify(permission.conditions));
        conditions = JSON.parse(conditions({ userId }));
      }
      can(permission.action, permission.subject, conditions);
    });
  });

  return build();
};

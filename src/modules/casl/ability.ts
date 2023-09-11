import { AbilityBuilder, createMongoAbility } from '@casl/ability';

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

  user.roles.forEach((role) => {
    role.permissions.forEach((permission) => {
      let conditions: any;
      if (permission.conditions) {
        conditions = permission.conditions;
      }
      can(permission.action, permission.subject, conditions);
    });
  });

  return build();
};

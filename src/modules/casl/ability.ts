import { AbilityBuilder, createMongoAbility } from '@casl/ability';

import { PermissionItem } from 'shared/types/general';
export const defineAbilitiesForUser = async (permissions: PermissionItem[]) => {
  const { can, build } = new AbilityBuilder(createMongoAbility);
  permissions.forEach(
    ([, permissionAction, permissionSubject, permissionCondition]) => {
      can(permissionAction, permissionSubject, permissionCondition);
    },
  );
  return build();
};

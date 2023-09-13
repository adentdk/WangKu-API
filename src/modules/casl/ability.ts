import { AbilityBuilder, createMongoAbility } from '@casl/ability';

export const defineAbilitiesForUser = async (permissions: any[][]) => {
  const { can, build } = new AbilityBuilder(createMongoAbility);
  permissions.forEach(
    ([, permissionAction, permissionSubject, permissionCondition]) => {
      can(permissionAction, permissionSubject, permissionCondition);
    },
  );
  return build();
};

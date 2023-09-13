import { AbilityBuilder, createMongoAbility } from '@casl/ability';
export type PermissionItem = [string, string, string, object | null];
export const defineAbilitiesForUser = async (permissions: PermissionItem[]) => {
  const { can, build } = new AbilityBuilder(createMongoAbility);
  permissions.forEach(
    ([, permissionAction, permissionSubject, permissionCondition]) => {
      can(permissionAction, permissionSubject, permissionCondition);
    },
  );
  return build();
};

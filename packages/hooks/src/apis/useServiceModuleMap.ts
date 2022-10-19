import { useMemo } from "react";
import {
  ServiceModuleMap,
  OrganizationRoleModule,
} from "@eGroupAI/typings/apis";

export default function useServiceModuleMap(
  orgRoleModules?: OrganizationRoleModule[]
) {
  const result = useMemo(
    () =>
      orgRoleModules
        ?.map((el) => ({
          serviceModuleId: el.serviceModule.serviceModuleId,
          organizationRoleModulePermissionList:
            el.organizationRoleModulePermissionList,
        }))
        .reduce<ServiceModuleMap>(
          (a, v) => ({
            ...a,
            [v.serviceModuleId]: v.organizationRoleModulePermissionList,
          }),
          {}
        ),
    [orgRoleModules]
  );

  return result;
}

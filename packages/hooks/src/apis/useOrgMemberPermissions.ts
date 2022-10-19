import { useMemo } from "react";

import { useSelector } from "react-redux";
import { getSelectedOrgId } from "@eGroupAI/redux-modules/memberOrgs";
import { ModulePermission } from "@eGroupAI/typings/apis";
import useOrgMemberModules from "./useOrgMemberModules";
import useOrgModules from "./useOrgModules";

type Permissions<ServiceModuleValue extends string> = {
  [key in ServiceModuleValue]?: (keyof typeof ModulePermission)[];
};

export default function useOrgMemberPermissions<
  ServiceModuleValue extends string
>(): [Permissions<ServiceModuleValue>, string[]] {
  const organizationId = useSelector(getSelectedOrgId);
  const { data: orgModules } = useOrgModules(
    {
      organizationId,
    },
    undefined,
    {
      revalidateOnFocus: false,
    }
  );
  const { data: modules } = useOrgMemberModules(
    {
      organizationId,
    },
    undefined,
    {
      revalidateOnFocus: false,
    }
  );
  const permissions = useMemo(() => {
    if (modules) {
      return modules.reduce<Permissions<ServiceModuleValue>>(
        (p, c) => ({
          ...p,
          [c.organizationRole.serviceModule.serviceModuleValue]:
            c.organizationRoleModulePermissionList,
        }),
        {}
      );
    }
    return {};
  }, [modules]);

  const serviceModuleValues = useMemo(() => {
    if (orgModules) {
      return orgModules.source
        .map((el) => el.serviceMainModule.serviceModuleList || [])
        .reduce((a, b) => [...a, ...b], [])
        .map((el) => el.serviceModuleValue);
    }
    return [];
  }, [orgModules]);

  return [permissions, serviceModuleValues];
}

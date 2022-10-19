import { ModuleRouteMapping, Route } from "@eGroupAI/typings/apis";
import { useMemo } from "react";
import filterRoutes from "./filterRoutes";
import useOrgMemberPermissions from "../useOrgMemberPermissions";

const useFilterRoutes = <ServiceModuleValue extends string>(
  moduleRouteMapping: ModuleRouteMapping<ServiceModuleValue>,
  routes: Route[],
  commonAvailableModules: string[] = [],
  blockRoutes?: string[]
) => {
  const [permissions, serviceModuleValues] =
    useOrgMemberPermissions<ServiceModuleValue>();

  const filtedRoutes = useMemo(() => {
    if (!permissions || serviceModuleValues.length === 0) return undefined;
    if (Object.keys(permissions).length === 0) {
      return filterRoutes<ServiceModuleValue>(
        moduleRouteMapping,
        routes,
        commonAvailableModules
      );
    }
    let filtedRoutes = filterRoutes<ServiceModuleValue>(
      moduleRouteMapping,
      routes,
      [...commonAvailableModules, ...serviceModuleValues]
    );
    filtedRoutes = filterRoutes<ServiceModuleValue>(
      moduleRouteMapping,
      routes,
      [...commonAvailableModules, ...Object.keys(permissions)],
      blockRoutes
    );
    return filtedRoutes;
  }, [
    blockRoutes,
    commonAvailableModules,
    moduleRouteMapping,
    permissions,
    routes,
    serviceModuleValues,
  ]);

  return filtedRoutes;
};

export default useFilterRoutes;

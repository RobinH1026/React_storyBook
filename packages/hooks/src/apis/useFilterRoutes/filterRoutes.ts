import unique from "@eGroupAI/utils/unique";
import { Route, ModuleRouteMapping } from "@eGroupAI/typings/apis";
import iterationAndFilterRoutes from "./iterationAndFilterRoutes";

/**
 * Filter availableRoutes by availableModules.
 * @param routes available routes
 * @param availableModules available modules
 * @param blockRoutes block routes
 */
export default function filterRoutes<ServiceModuleValue extends string>(
  moduleRouteMapping: ModuleRouteMapping<ServiceModuleValue>,
  routes?: Route[],
  availableModules?: string[],
  blockRoutes?: string[]
) {
  if (routes && availableModules) {
    /**
     * Get all availableRoutes by availableModules.
     */
    let availableRoutes: string[] = [];
    unique(availableModules).forEach((permission) => {
      availableRoutes = availableRoutes.concat(
        moduleRouteMapping[permission] || []
      );
    });
    if (blockRoutes) {
      availableRoutes = availableRoutes.filter(
        (el) => !blockRoutes.includes(el)
      );
    }
    return iterationAndFilterRoutes(routes, availableRoutes);
  }
  return routes;
}

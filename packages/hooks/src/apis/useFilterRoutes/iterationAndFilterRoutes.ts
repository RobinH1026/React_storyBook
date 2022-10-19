import { Route } from "@eGroupAI/typings/apis";

/**
 * iteration routes and filter all nest path by availableRoutes
 */
export default function iterationAndFilterRoutes(
  routes: Route[],
  availableRoutes: string[]
): Route[] {
  return routes
    .filter((route) => {
      if (route.path) {
        return availableRoutes.includes(route.path);
      }
      if (route.routes) {
        return true;
      }
      return false;
    })
    .map((route) => {
      if (route.routes) {
        return {
          ...route,
          routes: iterationAndFilterRoutes(route.routes, availableRoutes),
        };
      }
      return route;
    });
}

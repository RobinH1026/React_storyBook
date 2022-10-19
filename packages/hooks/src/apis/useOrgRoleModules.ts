import { OrganizationRoleModule, EntityList } from "@eGroupAI/typings/apis";
import makeGetHook from "./makeGetHook";
import { fetcher } from "./fetchers";

export type PathParams = {
  organizationId?: string;
  organizationRoleId?: string;
};
const useOrgRoleModules = makeGetHook<
  EntityList<OrganizationRoleModule>,
  PathParams
>(
  "/organizations/{{organizationId}}/roles/{{organizationRoleId}}/modules",
  fetcher
);
export default useOrgRoleModules;

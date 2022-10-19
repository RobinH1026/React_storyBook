import { EntityList, OrganizationRole } from "@eGroupAI/typings/apis";
import makeGetHook from "./makeGetHook";
import { fetcher } from "./fetchers";

export type PathParams = {
  organizationId?: string;
};
const useOrgRoles = makeGetHook<EntityList<OrganizationRole>, PathParams>(
  "/organizations/{{organizationId}}/roles",
  fetcher
);
export default useOrgRoles;

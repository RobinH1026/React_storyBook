import { OrganizationRole } from "@eGroupAI/typings/apis";
import makeGetHook from "./makeGetHook";
import { fetcher } from "./fetchers";

export type PathParams = {
  organizationId?: string;
  organizationRoleId?: string;
};
const useOrgRole = makeGetHook<OrganizationRole, PathParams>(
  "/organizations/{{organizationId}}/roles/{{organizationRoleId}}",
  fetcher
);
export default useOrgRole;

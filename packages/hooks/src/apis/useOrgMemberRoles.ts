import { OrganizationMemberRole, EntityList } from "@eGroupAI/typings/apis";
import makeGetHook from "./makeGetHook";
import { fetcher } from "./fetchers";

export type PathParams = {
  organizationId?: string;
  loginId?: string;
};
const useOrgMemberRoles = makeGetHook<
  EntityList<OrganizationMemberRole>,
  PathParams
>("/organizations/{{organizationId}}/members/{{loginId}}/roles", fetcher);
export default useOrgMemberRoles;

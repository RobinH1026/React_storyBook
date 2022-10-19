import { OrganizationMemberRole } from "@eGroupAI/typings/apis";
import makeGetHook from "./makeGetHook";
import { fetcher } from "./fetchers";

export type PathParams = {
  organizationId?: string;
};
const useOrgMemberModules = makeGetHook<OrganizationMemberRole[], PathParams>(
  "/member/organizations/{{organizationId}}/module-auth",
  fetcher
);
export default useOrgMemberModules;

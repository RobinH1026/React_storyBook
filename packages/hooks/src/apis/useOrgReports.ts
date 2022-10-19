import { OrganizationReport } from "@eGroupAI/typings/apis";
import makeGetHook from "./makeGetHook";
import { fetcher } from "./fetchers";

export type PathParams = {
  organizationId?: string;
};
const useOrgReports = makeGetHook<OrganizationReport[], PathParams>(
  "/organizations/{{organizationId}}/reports",
  fetcher
);
export default useOrgReports;

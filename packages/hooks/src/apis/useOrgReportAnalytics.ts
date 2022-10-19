import { OrganizationReportAnalytics } from "@eGroupAI/typings/apis";
import makePostHook from "./makePostHook";
import { fetcher } from "./fetchers";

export type PathParams = {
  organizationId?: string;
  reportId?: string;
};
const useOrgReportAnalytics = makePostHook<
  OrganizationReportAnalytics,
  PathParams
>("/organizations/{{organizationId}}/reports/{{reportId}}/analytics", fetcher);
export default useOrgReportAnalytics;

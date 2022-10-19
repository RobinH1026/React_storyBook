import { SearchRecord } from "@eGroupAI/typings/apis";
import makeGetHook from "./makeGetHook";
import { fetcher } from "./fetchers";

export type PathParams = {
  organizationId?: string;
};
const useMemberOrgSearchRecords = makeGetHook<SearchRecord, PathParams>(
  "/member/organizations/{{organizationId}}/search-text-records",
  fetcher
);
export default useMemberOrgSearchRecords;

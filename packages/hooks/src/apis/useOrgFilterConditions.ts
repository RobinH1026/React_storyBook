import { FilterCondition } from "@eGroupAI/typings/apis";
import makeGetHook from "./makeGetHook";
import { fetcher } from "./fetchers";

export type PathParams = {
  organizationId?: string;
  filterType: string;
};

const useOrgFilterConditions = makeGetHook<FilterCondition[], PathParams>(
  "/organizations/{{organizationId}}/filter-list/{{filterType}}",
  fetcher
);
export default useOrgFilterConditions;

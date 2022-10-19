import { FilterConditionGroup } from "@eGroupAI/typings/apis";
import makeGetHook from "./makeGetHook";
import { fetcher } from "./fetchers";

export type PathParams = {
  organizationId?: string;
  filterType: string;
};

const useOrgFilterConditionGroups = makeGetHook<
  FilterConditionGroup[],
  PathParams
>("/V2/organizations/{{organizationId}}/filter-list/{{filterType}}", fetcher);
export default useOrgFilterConditionGroups;

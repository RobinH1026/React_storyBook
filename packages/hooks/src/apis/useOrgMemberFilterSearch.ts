import {
  EntityList,
  FilterSearch,
  OrganizationMember,
} from "@eGroupAI/typings/apis";
import makePostHook from "./makePostHook";
import { fetcher } from "./fetchers";

export type PathParams = {
  organizationId?: string;
};

const useOrgMemberFilterSearch = makePostHook<
  EntityList<OrganizationMember>,
  PathParams,
  FilterSearch
>("/organizations/{{organizationId}}/search/members", fetcher);

export default useOrgMemberFilterSearch;

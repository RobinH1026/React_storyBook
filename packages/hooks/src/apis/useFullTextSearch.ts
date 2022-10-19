import { EntityList, SearchResult } from "@eGroupAI/typings/apis";
import makePostHook from "./makePostHook";
import { fetcher } from "./fetchers";

export type PathParams = {
  organizationId?: string;
};
const useFullTextSearch = makePostHook<EntityList<SearchResult>, PathParams>(
  "/organizations/{{organizationId}}/search",
  fetcher
);
export default useFullTextSearch;

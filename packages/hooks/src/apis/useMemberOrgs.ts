import { EntityList, Organization } from "@eGroupAI/typings/apis";
import makeGetHook from "./makeGetHook";
import { fetcher } from "./fetchers";

const useMemberOrgs = makeGetHook<EntityList<Organization>>(
  "/member/organizations",
  fetcher
);
export default useMemberOrgs;

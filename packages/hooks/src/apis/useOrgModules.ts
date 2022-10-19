import { EntityList, OrganizationModule } from "@eGroupAI/typings/apis";
import makeGetHook from "./makeGetHook";
import { fetcher } from "./fetchers";

export type PathParams = {
  organizationId?: string;
};
const useOrgModules = makeGetHook<EntityList<OrganizationModule>, PathParams>(
  "/organizations/{{organizationId}}/modules",
  fetcher
);
export default useOrgModules;

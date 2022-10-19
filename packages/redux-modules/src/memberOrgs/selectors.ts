import getIn from "@eGroupAI/utils/getIn";
import { Organization } from "@eGroupAI/typings/apis";

export const getSelectedOrg = (state: any): Organization =>
  getIn(state, ["memberOrgs", "selectedOrg"]);
export const getSelectedOrgId = (state: any): string =>
  getIn(state, ["memberOrgs", "selectedOrg", "organizationId"]);

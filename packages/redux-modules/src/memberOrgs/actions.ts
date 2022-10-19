import { Organization } from "@eGroupAI/typings/apis";
import { createAction } from "@reduxjs/toolkit";

export const setSelectedOrg = createAction<Organization>("SET_SELECTED_ORG");

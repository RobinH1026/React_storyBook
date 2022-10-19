import { createReducer } from "@reduxjs/toolkit";
import setIn from "@eGroupAI/utils/setIn";
import { setSelectedOrg } from "./actions";

export const memberOrgs = createReducer(
  {
    selectedOrg: undefined,
  },
  {
    [setSelectedOrg.type]: (draft, action) => {
      if (!action.payload) return;
      setIn(draft, ["selectedOrg"], action.payload);
    },
  }
);

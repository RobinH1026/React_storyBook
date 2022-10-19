import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setSelectedOrg,
  getSelectedOrg,
} from "@eGroupAI/redux-modules/memberOrgs";
import useMemberOrgs from "./useMemberOrgs";

export default function useSetSelectedOrgId() {
  const dispatch = useDispatch();
  const selectedOrg = useSelector(getSelectedOrg);

  const { data } = useMemberOrgs();

  useEffect(() => {
    if (data && data.source.length > 0 && !selectedOrg) {
      const selectedOrgId = window.localStorage.getItem("selectedOrgId");
      if (selectedOrgId) {
        const org = data.source.find(
          (el) => el.organizationId === selectedOrgId
        );
        if (org) {
          dispatch(setSelectedOrg(org));
        } else if (data.source[0]) {
          dispatch(setSelectedOrg(data.source[0]));
        }
      } else if (data.source[0]) {
        dispatch(setSelectedOrg(data.source[0]));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, dispatch]);
}

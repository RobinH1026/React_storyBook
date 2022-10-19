import { useSelector } from "react-redux";
import { getSelectedOrg } from "@eGroupAI/redux-modules/memberOrgs";
import useMemberInfo from "./useMemberInfo";

type ReturnType =
  | {
      isOrgOwner: boolean;
      orgOwnerLoginId: string;
      loginId: string;
    }
  | Record<string, never>;

export default function useCheckOrgOwner(): ReturnType {
  const { data: memberInfo } = useMemberInfo(undefined, undefined, {
    revalidateOnFocus: false,
  });
  const selectedOrg = useSelector(getSelectedOrg);
  if (!memberInfo?.loginId || !selectedOrg) {
    return {};
  }
  const orgOwnerLoginId: string = selectedOrg.creator.loginId;
  return {
    isOrgOwner: memberInfo.loginId === orgOwnerLoginId,
    orgOwnerLoginId,
    loginId: memberInfo.loginId,
  };
}

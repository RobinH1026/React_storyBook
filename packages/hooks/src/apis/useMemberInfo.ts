import { Member } from "@eGroupAI/typings/apis";
import makeGetHook from "./makeGetHook";
import { fetcher } from "./fetchers";

const useMemberInfo = makeGetHook<Member>("/member/info", fetcher);
export default useMemberInfo;

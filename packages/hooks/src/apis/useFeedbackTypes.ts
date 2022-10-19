import { FeedbackType, EntityList } from "@eGroupAI/typings/apis";
import makeGetHook from "./makeGetHook";
import { fetcher } from "./fetchers";

const useFeedbackTypes = makeGetHook<EntityList<FeedbackType>>(
  "/feedback-types",
  fetcher
);
export default useFeedbackTypes;

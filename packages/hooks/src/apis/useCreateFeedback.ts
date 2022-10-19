import { CreateFeedbackApiPayload, FeedbackType } from "@eGroupAI/typings/apis";
import useAxiosApi from "./useAxiosApi";
import apis from "./apis";

export default function useCreateFeedback() {
  const parameters = useAxiosApi<FeedbackType, CreateFeedbackApiPayload>(
    apis.createFeedback
  );
  return parameters;
}

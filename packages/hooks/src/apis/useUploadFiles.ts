import { UploadFilesApiPayload } from "@eGroupAI/typings/apis";
import useAxiosApi from "./useAxiosApi";
import apis from "./apis";

export default function useUploadFiles<
  UploadFile,
  ServiceModuleValue extends string
>() {
  const parameters = useAxiosApi<
    UploadFile[],
    UploadFilesApiPayload<ServiceModuleValue>
  >(apis.uploadFiles);
  return parameters;
}

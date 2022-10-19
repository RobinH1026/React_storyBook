import { UploadOrgFilesApiPayload } from "@eGroupAI/typings/apis";
import useAxiosApi from "./useAxiosApi";
import apis from "./apis";

export default function useUploadOrgFiles<
  UploadFile,
  ServiceModuleValue extends string
>() {
  const parameters = useAxiosApi<
    UploadFile[],
    UploadOrgFilesApiPayload<ServiceModuleValue>
  >(apis.uploadOrgFiles);
  return parameters;
}

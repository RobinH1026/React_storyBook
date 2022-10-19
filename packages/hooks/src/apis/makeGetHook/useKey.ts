import { useCallback } from "react";
import queryString, { StringifiableRecord } from "query-string";
import replacer from "@eGroupAI/utils/replacer";
import objectCheckNull from "@eGroupAI/utils/objectCheckNull";

export type UseKeyArgs<PathParams> = {
  defaultPathParams?: PathParams;
  defaultQueryParams?: StringifiableRecord;
  pathParams?: PathParams;
  queryParams?: StringifiableRecord;
  disableFetch?: boolean;
  urlPattern: string;
};

export default function useKey<PathParams>({
  defaultPathParams,
  defaultQueryParams,
  pathParams,
  queryParams,
  disableFetch,
  urlPattern,
}: UseKeyArgs<PathParams>) {
  const getKey = useCallback(
    (cusQueryParams?: StringifiableRecord) => {
      const mergePathParams = {
        ...defaultPathParams,
        ...pathParams,
      } as PathParams;
      const mergeQuery = {
        ...defaultQueryParams,
        ...queryParams,
        ...cusQueryParams,
      } as StringifiableRecord;
      if (
        disableFetch ||
        objectCheckNull(mergePathParams, { checkEmptyString: true })
      ) {
        return null;
      }
      return `${replacer<PathParams>(
        urlPattern,
        mergePathParams
      )}?${queryString.stringify(mergeQuery)}`;
    },
    [
      defaultPathParams,
      defaultQueryParams,
      disableFetch,
      pathParams,
      queryParams,
      urlPattern,
    ]
  );

  return getKey;
}

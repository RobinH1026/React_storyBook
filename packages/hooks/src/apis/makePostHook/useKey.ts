import { useCallback } from "react";
import queryString, { StringifiableRecord } from "query-string";
import replacer from "@eGroupAI/utils/replacer";
import objectCheckNull from "@eGroupAI/utils/objectCheckNull";

export type UseKeyArgs<PathParams, Body> = {
  defaultPathParams?: PathParams;
  defaultQueryParams?: StringifiableRecord;
  pathParams?: PathParams;
  queryParams?: StringifiableRecord;
  disableFetch?: boolean;
  body?: Body;
  urlPattern: string;
};

export default function useKey<PathParams, Body>({
  defaultPathParams,
  defaultQueryParams,
  pathParams,
  queryParams,
  disableFetch,
  body,
  urlPattern,
}: UseKeyArgs<PathParams, Body>) {
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
      if (disableFetch || objectCheckNull(mergePathParams)) return null;
      const cacheKey = queryString.stringify({
        payload: JSON.stringify(body),
        ...mergeQuery,
      });
      return `${replacer<PathParams>(urlPattern, mergePathParams)}?${cacheKey}`;
    },
    [
      body,
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

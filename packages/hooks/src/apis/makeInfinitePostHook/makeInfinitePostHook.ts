import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import queryString, { StringifiableRecord } from "query-string";
import useSWRInfinite, { SWRInfiniteConfiguration } from "swr/infinite";
import {
  PathParams as DefaultPathParamsType,
  ReturnedInfiniteValues,
} from "@eGroupAI/typings/apis";
import objectCheckNull from "@eGroupAI/utils/objectCheckNull";
import replacer from "@eGroupAI/utils/replacer";

export type ShouldStop<Data> = (
  data: AxiosResponse<Data, any> | null
) => boolean;
export default function makeInfinitePostHook<
  Data = unknown,
  PathParams = DefaultPathParamsType,
  Body = unknown,
  ErrorData = unknown
>(
  urlPattern: string,
  fetcherArg: AxiosInstance,
  shouldStop?: ShouldStop<Data>,
  defaultPathParams?: PathParams,
  defaultBody?: Body,
  defaultQueryParams?: StringifiableRecord,
  defaultConfig?: SWRInfiniteConfiguration<
    AxiosResponse<Data>,
    AxiosError<ErrorData>
  >,
  fromKey = "startIndex"
) {
  return function useItem(
    pathParams?: PathParams,
    body?: Body,
    queryParams?: StringifiableRecord,
    offset = 1,
    customConfig?: SWRInfiniteConfiguration<
      AxiosResponse<Data>,
      AxiosError<ErrorData>
    >,
    disableFetch?: boolean
  ): ReturnedInfiniteValues<Data, ErrorData> {
    const { error, data, mutate, isValidating, size, setSize } = useSWRInfinite(
      (index, d) => {
        if (shouldStop && shouldStop(d)) return null;
        const mergePathParams = {
          ...defaultPathParams,
          ...pathParams,
        } as PathParams;
        const mergeQuery = {
          ...defaultQueryParams,
          ...queryParams,
          [fromKey]: index * offset,
        } as StringifiableRecord;
        if (disableFetch || objectCheckNull(mergePathParams)) return null;
        const cacheKey = queryString.stringify({
          payload: JSON.stringify(body),
          ...mergeQuery,
        });
        return `${replacer<PathParams>(
          urlPattern,
          mergePathParams
        )}?${cacheKey}`;
      },
      (urlArg) => {
        const {
          url,
          query: { payload, ...query },
        } = queryString.parseUrl(urlArg);
        const postUrl = `${url}?${queryString.stringify(query)}`;

        return fetcherArg.post<Data>(postUrl, {
          ...defaultBody,
          ...body,
          ...query,
        });
      },
      {
        ...defaultConfig,
        ...customConfig,
      }
    );

    return {
      data: data?.map((el) => el.data),
      isError: !!error,
      mutate,
      response: data,
      error,
      isValidating,
      size,
      setSize,
    };
  };
}

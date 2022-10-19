import { useCallback } from "react";
import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { StringifiableRecord } from "query-string";
import useSWRInfinite, { SWRInfiniteConfiguration } from "swr/infinite";
import {
  PathParams as DefaultPathParamsType,
  ReturnedInfiniteValues,
} from "@eGroupAI/typings/apis";
import useKey from "../makeGetHook/useKey";

export type ShouldStop<Data> = (
  data: AxiosResponse<Data, any> | null
) => boolean;
export default function makeInfiniteGetHook<
  Data = unknown,
  PathParams = DefaultPathParamsType,
  ErrorData = unknown
>(
  urlPattern: string,
  fetcherArg: AxiosInstance,
  shouldStop?: ShouldStop<Data>,
  defaultPathParams?: PathParams,
  defaultQueryParams?: StringifiableRecord,
  defaultConfig?: SWRInfiniteConfiguration<
    AxiosResponse<Data>,
    AxiosError<ErrorData>
  >,
  fromKey = "startIndex"
) {
  return function useItem(
    pathParams?: PathParams,
    queryParams?: StringifiableRecord,
    customConfig?: SWRInfiniteConfiguration<
      AxiosResponse<Data>,
      AxiosError<ErrorData>
    >,
    disableFetch?: boolean
  ): ReturnedInfiniteValues<Data, ErrorData> {
    const getKey = useKey<PathParams>({
      defaultPathParams,
      defaultQueryParams,
      pathParams,
      queryParams,
      disableFetch,
      urlPattern,
    });

    const fetcher = useCallback((url) => fetcherArg.get<Data>(url), []);

    const { error, data, mutate, isValidating, size, setSize } = useSWRInfinite(
      (index, data) => {
        if (shouldStop && shouldStop(data)) return null;
        return getKey({
          [fromKey]: index,
        });
      },
      fetcher,
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

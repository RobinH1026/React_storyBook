import { useCallback } from "react";
import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { StringifiableRecord } from "query-string";
import useSWR, { SWRConfiguration } from "swr";
import useSWRImmutable from "swr/immutable";
import {
  PathParams as DefaultPathParamsType,
  ReturnedValues,
} from "@eGroupAI/typings/apis";
import useKey from "./useKey";

export default function makeGetHook<
  Data = unknown,
  PathParams = DefaultPathParamsType,
  ErrorData = unknown
>(
  urlPattern: string,
  fetcherArg: AxiosInstance,
  defaultPathParams?: PathParams,
  defaultQueryParams?: StringifiableRecord,
  defaultConfig?: SWRConfiguration<AxiosResponse<Data>, AxiosError<ErrorData>>,
  immutable?: boolean
) {
  const useSelectedSWR = immutable ? useSWRImmutable : useSWR;

  return function useItem(
    pathParams?: PathParams,
    queryParams?: StringifiableRecord,
    customConfig?: SWRConfiguration<AxiosResponse<Data>, AxiosError<ErrorData>>,
    disableFetch?: boolean
  ): ReturnedValues<Data, ErrorData> {
    const getKey = useKey<PathParams>({
      defaultPathParams,
      defaultQueryParams,
      pathParams,
      queryParams,
      disableFetch,
      urlPattern,
    });

    const fetcher = useCallback((url) => fetcherArg.get<Data>(url), []);

    const key = getKey();

    const { error, data, mutate, isValidating } = useSelectedSWR(key, fetcher, {
      ...defaultConfig,
      ...customConfig,
    });

    return {
      data: data?.data,
      isError: !!error,
      mutate,
      response: data,
      error,
      key,
      isValidating,
    };
  };
}

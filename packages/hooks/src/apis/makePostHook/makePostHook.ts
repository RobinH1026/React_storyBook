import { useCallback } from "react";
import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import queryString, { StringifiableRecord } from "query-string";
import useSWR, { SWRConfiguration } from "swr";
import useSWRImmutable from "swr/immutable";
import {
  PathParams as DefaultPathParamsType,
  ReturnedValues,
} from "@eGroupAI/typings/apis";
import useKey from "./useKey";

export default function makePostHook<
  Data = unknown,
  PathParams = DefaultPathParamsType,
  Body = unknown,
  ErrorData = unknown
>(
  urlPattern: string,
  fetcherArg: AxiosInstance,
  defaultPathParams?: PathParams,
  defaultBody?: Body,
  defaultQueryParams?: StringifiableRecord,
  defaultConfig?: SWRConfiguration<AxiosResponse<Data>, AxiosError<ErrorData>>,
  immutable?: boolean
) {
  const useSelectedSWR = immutable ? useSWRImmutable : useSWR;

  return function useItem(
    pathParams?: PathParams,
    body?: Body,
    queryParams?: StringifiableRecord,
    customConfig?: SWRConfiguration<AxiosResponse<Data>, AxiosError<ErrorData>>,
    disableFetch?: boolean
  ): ReturnedValues<Data, ErrorData> {
    const fetcher = useCallback(
      (urlArg) => {
        const {
          url,
          query: { payload, ...query },
        } = queryString.parseUrl(urlArg);
        const postUrl = `${url}?${queryString.stringify(query)}`;

        return fetcherArg.post<Data>(postUrl, {
          ...defaultBody,
          ...body,
        });
      },
      [body]
    );

    const getKey = useKey({
      defaultPathParams,
      defaultQueryParams,
      pathParams,
      queryParams,
      disableFetch,
      urlPattern,
      body,
    });

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

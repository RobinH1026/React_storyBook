import { useEffect, useState, useMemo, useCallback } from "react";
import cache from "./cache";
import { FilterValues } from "./typing";

export interface Options {
  fromKey?: string;
  sizeKey?: string;
  queryKey?: string;
  enableLocalStorageCache?: boolean;
}

export interface DefaultPayload {
  from?: number;
  size?: number;
  query?: string;
  [key: string]: any;
}

export default function useDataTable<Payload = unknown>(
  key: string,
  defaultPayloadProp?: Payload & DefaultPayload,
  options?: Options
) {
  const {
    fromKey = "from",
    sizeKey = "size",
    queryKey = "query",
    enableLocalStorageCache,
  } = options || {};

  const getCachePayload = useCallback(() => {
    if (enableLocalStorageCache && typeof window !== "undefined") {
      const val = window.localStorage.getItem(`useDataTable-${key}`);
      return val ? JSON.parse(val) : cache.get(key);
    }
    return cache.get(key);
  }, [enableLocalStorageCache, key]);

  const defaultPayload: Payload & DefaultPayload = getCachePayload() || {
    [fromKey]: 0,
    [sizeKey]: 10,
    ...defaultPayloadProp,
  };
  const [payload, setPayload] = useState<Payload & DefaultPayload>(
    defaultPayload
  );
  const [submitedPayload, setSubmitedPayload] = useState<
    Payload & DefaultPayload
  >(defaultPayload);

  useEffect(() => {
    cache.set(key, payload);
    if (enableLocalStorageCache && typeof window !== "undefined") {
      window.localStorage.setItem(
        `useDataTable-${key}`,
        JSON.stringify(payload)
      );
    }
  }, [enableLocalStorageCache, key, payload]);

  const handleSearchChange = useCallback(
    (e) => {
      setPayload((value) => ({
        ...value,
        [fromKey]: 0,
        [queryKey]: e.target.value,
      }));
    },
    [fromKey, queryKey]
  );

  const handleChangePage = useCallback(
    (_, { page, rowsPerPage }) => {
      setPayload((value) => ({
        ...value,
        [fromKey]: page * rowsPerPage,
      }));
    },
    [fromKey]
  );

  const handleRowsPerPageChange = useCallback(
    (_, { rowsPerPage }) => {
      setPayload((value) => ({
        ...value,
        [fromKey]: 0,
        [sizeKey]: rowsPerPage,
      }));
    },
    [fromKey, sizeKey]
  );

  const handleFilterValuesChange = useCallback((filterValues: FilterValues) => {
    setPayload((value) => ({
      ...value,
      filterValues,
    }));
  }, []);

  const handleFilterValuesSubmit = useCallback((filterValues: FilterValues) => {
    setPayload((value) => ({
      ...value,
      filterValues,
    }));
    setSubmitedPayload((value) => ({
      ...value,
      filterValues,
    }));
  }, []);

  const handleFilterValuesClear = useCallback(
    (filterValues: FilterValues) => {
      setPayload((value) => ({
        ...value,
        filterValues,
      }));
      if (submitedPayload.filterValues) {
        setSubmitedPayload((value) => ({
          ...value,
          filterValues,
        }));
      }
    },
    [submitedPayload.filterValues]
  );

  const page = useMemo(
    () => Math.ceil(Number(payload[fromKey]) / Number(payload[sizeKey])),
    [fromKey, payload, sizeKey]
  );
  const rowsPerPage = useMemo(
    () => parseInt(payload[sizeKey] as string, 10),
    [payload, sizeKey]
  );

  return {
    handleSearchChange,
    handleChangePage,
    handleRowsPerPageChange,
    handleFilterValuesChange,
    handleFilterValuesSubmit,
    handleFilterValuesClear,
    payload,
    setPayload,
    submitedPayload,
    setSubmitedPayload,
    page,
    rowsPerPage,
  };
}

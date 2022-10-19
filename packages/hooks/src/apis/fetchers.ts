import axios, { AxiosRequestConfig } from "axios";

export const fetcherConfig: AxiosRequestConfig = {
  baseURL: "/api",
  timeout: 1000 * 60 * 10,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
};

export const uploadFetcherConfig: AxiosRequestConfig = {
  baseURL: "/api",
  timeout: 0,
  headers: {
    "Content-Type": 'multipart/form-data; charset="utf-8";',
  },
};

export const downloadFetcherConfig: AxiosRequestConfig = {
  baseURL: "/api",
  timeout: 0,
  responseType: "blob",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
};

export const fetcher = axios.create(fetcherConfig);
export const uploadFetcher = axios.create(uploadFetcherConfig);
export const downloadFetcher = axios.create(downloadFetcherConfig);

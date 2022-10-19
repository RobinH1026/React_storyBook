import React, { FC } from "react";
import { SWRConfig } from "swr";
import {
  BareFetcher,
  ProviderConfiguration,
  PublicConfiguration,
  Cache,
} from "swr/dist/types";

export interface EgSWRConfigProps {
  value?:
    | (Partial<PublicConfiguration<any, any, BareFetcher<any>>> &
        Partial<ProviderConfiguration> & {
          provider?: ((cache: Readonly<Cache<any>>) => Cache<any>) | undefined;
        })
    | undefined;
}

const EgSWRConfig: FC<EgSWRConfigProps> = ({ children, value }) => (
  <SWRConfig
    value={{
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      onErrorRetry: (error, key, config, revalidate, { retryCount = 0 }) => {
        // Never retry on 404.
        if (
          error?.response?.status === 404 ||
          error?.response?.status === 403
        ) {
          return;
        }

        // Retry after 5 seconds.
        setTimeout(() => revalidate({ retryCount: retryCount + 1 }), 5000);
      },
      ...value,
    }}
  >
    {children}
  </SWRConfig>
);

export default EgSWRConfig;

import { useEffect, useMemo, useState } from "react";
import MobileDetect from "mobile-detect";

export type SupportMediaDevicesInfo = {
  iosVersionNotSupprot?: boolean;
  iosBrowserNotSupport?: boolean;
  androidBrowserNotSupport?: boolean;
  otherBrowserNotSupport?: boolean;
};
/**
 * To check user environment is supprot mediaDevices.
 */
export default function useIsSupportMediaDevices(): [
  boolean,
  SupportMediaDevicesInfo
] {
  const [info, setInfo] = useState<SupportMediaDevicesInfo>({});
  const isBrowser = typeof window !== "undefined";
  const isSupportMediaDevices = useMemo(
    () =>
      isBrowser &&
      !!(
        window.navigator.mediaDevices &&
        window.navigator.mediaDevices.getUserMedia
      ),
    [isBrowser]
  );

  useEffect(() => {
    if (isBrowser && !isSupportMediaDevices) {
      const md = new MobileDetect(window.navigator.userAgent);
      const os = md.os();
      if (os === "iOS") {
        if (md.version("iOS") < 11) {
          setInfo({
            iosVersionNotSupprot: true,
          });
        } else {
          setInfo({
            iosBrowserNotSupport: true,
          });
        }
      } else if (os === "AndroidOS") {
        setInfo({
          androidBrowserNotSupport: true,
        });
      } else {
        setInfo({
          otherBrowserNotSupport: true,
        });
      }
    }
  }, [isSupportMediaDevices, isBrowser]);

  return [isSupportMediaDevices, info];
}

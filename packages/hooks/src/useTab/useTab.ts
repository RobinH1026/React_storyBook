import { useEffect, useState } from "react";
import cache from "./cache";

export default function useTab<Value = unknown>(
  key: string,
  defaultValue: Value,
  disableCache = false
) {
  const [value, setValue] = useState<Value>(cache.get(key) ?? defaultValue);

  useEffect(() => {
    if (!disableCache) {
      cache.set(key, value);
    }
  }, [disableCache, key, value]);

  const handleChange = (newValue: Value) => {
    setValue(newValue);
  };

  return {
    value,
    handleChange,
    setValue,
  };
}

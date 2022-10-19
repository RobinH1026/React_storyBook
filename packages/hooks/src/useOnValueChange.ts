import { useEffect } from "react";
import { dequal } from "dequal";
import usePrevious from "./usePrevious";

export type OnChange<Value> = (value: Value) => void;

/**
 * Event fired when value change deeply.
 */
export default function useOnValueChange<Value = unknown>(
  value: Value,
  onChange: OnChange<Value>
) {
  const prevData = usePrevious(value);

  useEffect(() => {
    if (!dequal(prevData, value)) {
      onChange(value);
    }
  }, [value, onChange, prevData]);
}

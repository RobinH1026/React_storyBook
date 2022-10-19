import { LegacyRef, MutableRefObject, RefCallback } from "react";

type Ref<T> = MutableRefObject<T> | LegacyRef<T>;

/**
 * Merge Reactjs Refs.
 * @param refs
 * @returns
 */
export default function mergeRefs<T = any>(refs: Ref<T>[]): RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        // eslint-disable-next-line no-param-reassign
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
}

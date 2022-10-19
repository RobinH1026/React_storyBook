import { useRef, useState, useCallback, SetStateAction } from "react";

type NonUndefinedable<T> = T extends undefined ? never : T;

export type UseControlledArgs<Value> = {
  controlled: Value;
  default: NonUndefinedable<Value>;
};

export default function useControlled<Value = unknown>({
  controlled,
  default: defaultProp,
}: UseControlledArgs<Value>): [
  NonUndefinedable<Value>,
  (newValue: SetStateAction<NonUndefinedable<Value>>) => void
] {
  const { current: isControlled } = useRef(controlled !== undefined);
  const [valueState, setValue] = useState(defaultProp);
  const value = isControlled ? controlled : valueState;

  const setValueIfUncontrolled = useCallback(
    (newValue: SetStateAction<NonUndefinedable<Value>>) => {
      if (!isControlled) {
        setValue(newValue);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    []
  );

  return [value as NonUndefinedable<Value>, setValueIfUncontrolled];
}

import { useRef, useState, ReactNode, ForwardedRef } from "react";
import useScrollPosition from "@eGroupAI/hooks/useScrollPosition";
import { useSpring, UseSpringProps } from "react-spring";

export interface UseAosCoreProps {
  from?: UseSpringProps["from"];
  to?: UseSpringProps["to"];
  children?: ReactNode;
  /**
   * Configure the spring behavior for each key.
   */
  config?: UseSpringProps["config"];
  /**
   * Scroll Offset to call animation
   */
  offset?: number;
}

export default function useAosCore(
  props: UseAosCoreProps,
  ref?: ForwardedRef<HTMLDivElement>
) {
  const { from, to, config, offset = 200, ...other } = props;
  const [isShow, setIsShow] = useState(false);
  const [springProps, setSpringProps] = useSpring(() => ({
    from,
    config,
  }));
  const defaultRef = useRef<HTMLDivElement>(null);
  const elementRef = ref || defaultRef;

  useScrollPosition(
    ({ currPos }) => {
      const isShow =
        currPos.y > 0 && window.innerHeight - currPos.y - offset > 0;
      setIsShow(isShow);
    },
    [],
    elementRef
  );

  if (isShow) {
    setSpringProps({
      to,
    });
  }

  return {
    springProps,
    elementRef,
    ...other,
  };
}

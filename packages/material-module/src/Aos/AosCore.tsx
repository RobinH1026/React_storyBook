import React, { forwardRef } from "react";

import { animated } from "react-spring";
import useAosCore, { UseAosCoreProps } from "./useAosCore";

export type AosCoreProps = UseAosCoreProps

const AosCore = forwardRef<HTMLDivElement, AosCoreProps>((
  props,
  ref
) => {
  const { elementRef, springProps, ...other } = useAosCore(props, ref)

  return <animated.div ref={elementRef} style={springProps} {...other} />;
});

export default AosCore;

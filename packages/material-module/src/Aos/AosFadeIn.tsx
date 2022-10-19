import React, { forwardRef } from "react";

import AosCore, { AosCoreProps } from "./AosCore";

const AosFadeIn = forwardRef<HTMLDivElement, AosCoreProps>((
  props,
  ref
) => {
  const { from, to, ...other } = props;
  return (
    <AosCore
      ref={ref}
      from={{
        opacity: 0,
      }}
      to={{
        opacity: 1,
      }}
      {...other}
    />
  );
});

export default AosFadeIn;

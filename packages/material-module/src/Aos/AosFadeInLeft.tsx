import React, { forwardRef } from "react";

import AosCore, { AosCoreProps } from "./AosCore";

const AosFadeInLeft = forwardRef<HTMLDivElement, AosCoreProps>(
  (props, ref) => {
    const { from, to, ...other } = props;
    return (
      <AosCore
        ref={ref}
        from={{
          opacity: 0,
          transform: "translateX(-30px)",
        }}
        to={{
          opacity: 1,
          transform: "translateX(0px)",
        }}
        {...other}
      />
    );
  }
);

export default AosFadeInLeft;

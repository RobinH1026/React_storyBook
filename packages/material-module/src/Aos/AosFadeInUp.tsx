import React, { forwardRef } from "react";

import AosCore, { AosCoreProps } from "./AosCore";

const AosFadeInUp = forwardRef<HTMLDivElement, AosCoreProps>(
  (props, ref) => {
    const { from, to, ...other } = props;
    return (
      <AosCore
        ref={ref}
        from={{
          opacity: 0,
          transform: "translateY(30px)",
        }}
        to={{
          opacity: 1,
          transform: "translateY(0px)",
        }}
        {...other}
      />
    );
  }
);

export default AosFadeInUp;

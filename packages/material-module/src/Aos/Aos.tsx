import React, { forwardRef } from "react";

import AosFadeIn from "./AosFadeIn";
import AosFadeInRight from "./AosFadeInRight";
import AosFadeInLeft from "./AosFadeInLeft";
import AosFadeInUp from "./AosFadeInUp";
import AosSlideInLeft from "./AosSlideInLeft";
import AosSlideInRight from "./AosSlideInRight";
import AosSlideInDown from "./AosSlideInDown";
import { AosCoreProps } from "./AosCore";

const variantMapping = {
  fadeIn: AosFadeIn,
  fadeInRight: AosFadeInRight,
  fadeInLeft: AosFadeInLeft,
  fadeInUp: AosFadeInUp,
  slideInLeft: AosSlideInLeft,
  slideInRight: AosSlideInRight,
  slideInDown: AosSlideInDown,
};

export interface AosProps extends AosCoreProps {
  variant?: "fadeIn" | "fadeInRight" | "fadeInLeft" | "fadeInUp" | "slideInLeft" | "slideInRight" | "slideInDown";
}

/**
 * AOS - Animate On Scroll For ReactJs version
 * Use react-spring to implement.
 */
const Aos = forwardRef<HTMLDivElement, AosProps>((props, ref) => {
  const { variant = "fadeIn", ...other } = props;
  const AosComponent = variantMapping[variant];

  return <AosComponent ref={ref} {...other} />;
});

export default Aos;

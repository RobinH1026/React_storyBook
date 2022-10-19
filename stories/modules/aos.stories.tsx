import React, { FC } from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import Aos, { AosProps } from "@eGroupAI/material-module/Aos";
import { Typography } from "@mui/material";
import { animated, useSpring } from "react-spring";
import useAosCore from "@eGroupAI/material-module/Aos/useAosCore";

export default {
  title: "Modules/Aos",
  component: Aos,
} as Meta;

export const Default: Story<AosProps> = () => (
  <>
    <Aos>
      <Typography variant="h1">FadeIn by default</Typography>
    </Aos>
    <div style={{ height: 300 }} />
    <Aos variant="fadeInLeft">
      <Typography variant="h1">FadeInLeft when scroll</Typography>
    </Aos>
    <div style={{ height: 300 }} />
    <Aos variant="fadeInRight">
      <Typography variant="h1">fadeInRight when scroll</Typography>
    </Aos>
    <div style={{ height: 300 }} />
    <Aos variant="fadeInUp">
      <Typography variant="h1">fadeInUp when scroll</Typography>
    </Aos>
    <div style={{ height: 300 }} />
    <Aos variant="slideInLeft">
      <Typography variant="h1">SlideInLeft when scroll</Typography>
    </Aos>
    <div style={{ height: 300 }} />
    <Aos variant="slideInRight">
      <Typography variant="h1">SlideInRight when scroll</Typography>
    </Aos>
    <div style={{ height: 300 }} />
    <Aos variant="slideInDown">
      <Typography variant="h1">SlideInDown when scroll</Typography>
    </Aos>
    <div style={{ height: 300 }} />
  </>
);

const AosBounce: FC = ({ children }) => {
  const {
    elementRef,
    springProps: { x },
  } = useAosCore({
    from: {
      x: 0,
    },
    to: {
      x: 1,
    },
    config: {
      duration: 1000,
    },
  });

  return (
    <animated.div
      ref={elementRef}
      style={{
        transform: x
          .to({
            range: [0, 0.5, 1],
            output: ["0px", "-40px", "0px"],
          })
          .to((value) => `translateY(${value})`),
      }}
    >
      {children}
    </animated.div>
  );
};

export const CustomAosAnimation: Story<AosProps> = () => (
  <AosBounce>
    <Typography variant="h1">Aos Bounce</Typography>
  </AosBounce>
);

const Bounce: FC = ({ children }) => {
  const { x } = useSpring({
    from: {
      x: 0,
    },
    to: {
      x: 1,
    },
    config: {
      duration: 1500,
    },
    loop: true,
  });

  return (
    <animated.div
      style={{
        transform: x
          .to({
            range: [0, 0.5, 1],
            output: ["0px", "-40px", "0px"],
          })
          .to((value) => `translateY(${value})`),
      }}
    >
      {children}
    </animated.div>
  );
};

export const BasicAnimationWithoutTriggerOnScroll: Story<AosProps> = () => (
  <Bounce>
    <Typography variant="h1">Bounce</Typography>
  </Bounce>
);

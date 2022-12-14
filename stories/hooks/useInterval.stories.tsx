import React, { FC } from "react";

import { Meta } from "@storybook/react";
import useInterval from "@eGroupAI/hooks/useInterval";

export default {
  title: "Hooks/useInterval",
} as Meta;

export const Default: FC = () => {
  const [delay, setDelay] = React.useState(1000);
  const [count, setCount] = React.useState(0);
  const [isStop, setIsStop] = React.useState(false);

  // Increment the counter.
  useInterval(
    () => {
      setCount(count + 1);
    },
    isStop ? null : delay
  );

  // Make it faster every second!
  useInterval(
    () => {
      if (delay > 10) {
        setDelay(delay / 2);
      }
    },
    isStop ? null : 1000
  );

  function handleReset() {
    setDelay(1000);
  }

  function toggleCount() {
    setIsStop((v) => !v);
  }

  return (
    <>
      <h1>Counter: {count}</h1>
      <h4>Delay: {delay}</h4>
      <button onClick={handleReset}>Reset delay</button>
      <button onClick={toggleCount}>
        {isStop ? "Continue Count" : "Stop Count"}
      </button>
    </>
  );
};

import React from "react";

import { Meta, Story } from "@storybook/react";
import useDetectScrollAtBottom from "@eGroupAI/hooks/useDetectScrollAtBottom";

export default {
  title: "Hooks/useDetectScrollAtBottom",
} as Meta;

export const Default: Story = () => {
  useDetectScrollAtBottom(() => {
    alert("Scroll at bottom !");
  });

  return <div style={{ height: 2500 }}>Please scroll to the bottom</div>;
};

export const WithContainerRef: Story = () => {
  const { ref, onScroll } = useDetectScrollAtBottom(() => {
    alert("Scroll at bottom !");
  });

  return (
    <div
      onScroll={onScroll}
      ref={ref}
      style={{ maxHeight: 250, overflowY: "auto" }}
    >
      <div style={{ height: 2500 }}>Please scroll to the bottom</div>
    </div>
  );
};

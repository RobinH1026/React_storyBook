import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import CountCard, { CountCardProps } from "@eGroupAI/material-lab/CountCard";

export default {
  title: "Lab/CountCard",
  component: CountCard,
} as Meta;
export const Default: Story<CountCardProps> = (args) => (
  <CountCard
    {...args}
    iconName="AccessAlarm"
    title="Original Number of applicants"
    count={30}
  />
);

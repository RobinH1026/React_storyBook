import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import RoundedInput, {
  RoundedInputProps,
} from "@eGroupAI/material/RoundedInput";

export default {
  title: "Components/RoundedInput",
  component: RoundedInput,
  argTypes: {
    disabled: { control: "boolean" },
    fullWidth: { control: "boolean" },
    error: { control: "boolean" },
  },
} as Meta;

export const Default: Story<RoundedInputProps> = (args) => (
  <RoundedInput {...args} />
);

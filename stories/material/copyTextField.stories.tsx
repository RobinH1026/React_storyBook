import React from "react";
import { Meta, Story } from "@storybook/react";

import CopyTextField, {
  CopyTextFieldProps,
} from "@eGroupAI/material/CopyTextField";

export default {
  title: "Components/CopyTextField",
  component: CopyTextField,
} as Meta;

export const Default: Story<CopyTextFieldProps> = (args) => {
  const handleCopy = () => {
    // eslint-disable-next-line no-alert
    alert("copy !");
  };
  return (
    <CopyTextField
      value="https://www.google.com.tw/"
      onCopy={handleCopy}
      variant="outlined"
      copyOnMount
      {...args}
    />
  );
};

import React, { useState } from "react";
import { Meta, Story } from "@storybook/react";

import TimePicker, { TimePickerProps } from "@eGroupAI/material-lab/TimePicker";

export default {
  title: "Lab/TimePicker",
  component: TimePicker,
} as Meta;

export const Default: Story<TimePickerProps> = (args) => {
  const [time, setTime] = useState("");

  return (
    <>
      {time}
      <br />
      <TimePicker
        {...args}
        onChange={(time) => {
          setTime(time.join(":"));
        }}
      />
    </>
  );
};

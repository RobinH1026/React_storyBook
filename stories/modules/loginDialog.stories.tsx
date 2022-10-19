import React, { useState } from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import {
  LoginDialogA,
  LoginDialogProps,
} from "@eGroupAI/material-module/LoginDialog";
import Button from "@eGroupAI/material/Button";

export default {
  title: "Modules/LoginDialog",
  argTypes: {
    title: { control: "text" },
    locale: {
      control: {
        type: "radio",
        options: ["en", "zh-TW"],
      },
    },
  },
} as Meta;

export const Default: Story<LoginDialogProps> = (args) => {
  const [isOpenA, setIsOpenA] = useState(false);
  const [values, setValues] = useState({});
  return (
    <>
      {JSON.stringify(values)}
      <Button onClick={() => setIsOpenA(true)}>Open Dialog A</Button>
      <LoginDialogA
        {...args}
        isOpen={isOpenA}
        onClose={() => setIsOpenA(false)}
        onSubmit={(values) => {
          setValues(values);
          setIsOpenA(false);
        }}
        imgSrc="/login.png"
      />
    </>
  );
};

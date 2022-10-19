import React, { useState } from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import {
  FeedbackDialogA,
  FeedbackDialogB,
  FeedbackDialogProps,
} from "@eGroupAI/material-module/FeedbackDialog";
import Button from "@eGroupAI/material/Button";

export default {
  title: "Modules/FeedbackDialog",
  argTypes: {
    hideCountry: { control: "boolean" },
    hideCompany: { control: "boolean" },
    hideImageUpload: { control: "boolean" },
    locale: {
      control: {
        type: "radio",
        options: ["en", "zh-TW"],
      },
    },
  },
} as Meta;

export const Default: Story<FeedbackDialogProps> = (args) => {
  const [isOpenA, setIsOpenA] = useState(false);
  const [isOpenB, setIsOpenB] = useState(false);
  const [values, setValues] = useState({});
  const props = {
    ...args,
    typeOptions: [
      {
        label: "Label",
        value: "value",
      },
    ],
  };
  return (
    <>
      {JSON.stringify(values)}
      <Button onClick={() => setIsOpenA(true)}>Open Dialog A</Button>
      <Button onClick={() => setIsOpenB(true)}>Open Dialog B</Button>
      <FeedbackDialogA
        isOpen={isOpenA}
        onClose={() => setIsOpenA(false)}
        onSubmit={(values) => {
          setValues(values);
          setIsOpenA(false);
        }}
        {...props}
      />
      <FeedbackDialogB
        content="Lorem Ipsum is simply dummy text of the printing 
        and typesetting industry. Lorem Ipsum is simply dummy text
        the printing and typesetting industry."
        isOpen={isOpenB}
        onClose={() => setIsOpenB(false)}
        onSubmit={(values) => {
          setValues(values);
          setIsOpenB(false);
        }}
        {...props}
      />
    </>
  );
};

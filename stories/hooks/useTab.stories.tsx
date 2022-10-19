import React, { FC } from "react";

import { Meta } from "@storybook/react";
import useTab from "@eGroupAI/hooks/useTab";
import { Tab, Tabs, Typography } from "@mui/material";

export default {
  title: "Hooks/useTab",
} as Meta;

export const Default: FC = () => {
  const { value, handleChange } = useTab("demoTab", 0);

  return (
    <>
      <Tabs value={value} onChange={(_, newValue) => handleChange(newValue)}>
        <Tab label="Item One" />
        <Tab label="Item Two" />
        <Tab label="Item Three" />
      </Tabs>
      {value === 0 && <Typography>Item One</Typography>}
      {value === 1 && <Typography>Item Two</Typography>}
      {value === 2 && <Typography>Item Three</Typography>}
    </>
  );
};

export const WithCustomValue: FC = () => {
  const { value, handleChange } = useTab("demoTab2", "dog");

  return (
    <>
      <Tabs value={value} onChange={(_, newValue) => handleChange(newValue)}>
        <Tab label="Dog" value="dog" />
        <Tab label="Cat" value="cat" />
        <Tab label="Pig" value="pig" />
      </Tabs>
      {value === "dog" && <Typography>Dog</Typography>}
      {value === "cat" && <Typography>Cat</Typography>}
      {value === "pig" && <Typography>Pig</Typography>}
    </>
  );
};

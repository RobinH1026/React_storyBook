import React, { FC } from "react";
import { Meta } from "@storybook/react";

import Sticky from "@eGroupAI/material/Sticky";
import { Grid } from "@mui/material";

export default {
  title: "Components/Sticky",
  component: Sticky,
  argTypes: {
    top: { control: "number", defaultValue: 70 },
  },
} as Meta;

export const Default: FC = (args) => (
  <Grid container>
    <Grid item xs={6}>
      <div style={{ height: 10000 }}>Loong content</div>
    </Grid>
    <Grid item xs={6}>
      <Sticky {...args}>I m sticky</Sticky>
    </Grid>
  </Grid>
);

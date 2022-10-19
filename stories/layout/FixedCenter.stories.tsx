import React from "react";
import { Meta, Story } from "@storybook/react";

import FixedCenter from "@eGroupAI/material-layout/FixedCenter";
import { Typography } from "@mui/material";

export default {
  title: "Layout/FixedCenter",
  component: FixedCenter,
} as Meta;

export const Default: Story = () => (
  <FixedCenter>
    <div>
      <Typography>I&apos;m center of the world.</Typography>
    </div>
  </FixedCenter>
);

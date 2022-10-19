import React from "react";
import { Meta, Story } from "@storybook/react";

import NavbarBrick from "@eGroupAI/material-layout/NavbarBrick";

export default {
  title: "Layout/NavbarBrick",
  component: NavbarBrick,
} as Meta;

export const Default: Story = () => (
  <NavbarBrick style={{ backgroundColor: "#000" }} />
);
export const Dense: Story = () => (
  <NavbarBrick style={{ backgroundColor: "#000" }} dense />
);

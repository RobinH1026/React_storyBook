import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import IconButton, { IconButtonProps } from "@eGroupAI/material/IconButton";
import Grid from "@eGroupAI/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import Icomoon from "@eGroupAI/material/Icomoon";

export default {
  title: "Components/IconButton",
  component: IconButton,
  argTypes: {
    color: {
      control: {
        type: "radio",
        options: [
          "inherit",
          "primary",
          "secondary",
          "default",
          "text",
          "white",
          "success",
          "warning",
          "info",
          "error",
        ],
      },
    },
    edge: {
      control: {
        type: "radio",
        options: ["start", "end"],
      },
    },
    variant: {
      control: {
        type: "radio",
        options: ["standard", "rounded"],
      },
    },
    size: {
      control: {
        type: "radio",
        options: ["medium", "medium-small", "small"],
      },
    },
    disabled: {
      control: "boolean",
    },
  },
} as Meta;

export const Default: Story<IconButtonProps> = (args) => (
  <Grid container spacing={1}>
    <Grid item>
      <IconButton {...args} size="large">
        <Icomoon type="academic" />
      </IconButton>
    </Grid>
    <Grid item>
      <IconButton color="primary" {...args} size="large">
        <DeleteIcon />
      </IconButton>
    </Grid>
    <Grid item>
      <IconButton color="secondary" {...args} size="large">
        <DeleteIcon />
      </IconButton>
    </Grid>
    <Grid item>
      <IconButton color="text" {...args} size="large">
        <DeleteIcon />
      </IconButton>
    </Grid>
    <Grid item>
      <div style={{ background: "black", padding: 5 }}>
        <IconButton color="white" {...args} size="large">
          <DeleteIcon />
        </IconButton>
      </div>
    </Grid>
    <Grid item>
      <IconButton color="info" {...args} size="large">
        <DeleteIcon />
      </IconButton>
    </Grid>
    <Grid item>
      <IconButton color="success" {...args} size="large">
        <DeleteIcon />
      </IconButton>
    </Grid>
    <Grid item>
      <IconButton color="warning" {...args} size="large">
        <DeleteIcon />
      </IconButton>
    </Grid>
    <Grid item>
      <IconButton color="error" {...args} size="large">
        <DeleteIcon />
      </IconButton>
    </Grid>
    <Grid item>
      <div style={{ color: "paleturquoise" }}>
        <IconButton color="inherit" {...args} size="large">
          <DeleteIcon />
        </IconButton>
      </div>
    </Grid>
  </Grid>
);

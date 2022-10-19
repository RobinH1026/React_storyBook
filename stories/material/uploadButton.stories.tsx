import React from "react";
import { Meta, Story } from "@storybook/react";

import Grid from "@eGroupAI/material/Grid";
import UploadButton, {
  UploadButtonProps,
} from "@eGroupAI/material/UploadButton";
import Icomoon from "@eGroupAI/material/Icomoon";

export default {
  title: "Components/UploadButton",
  component: UploadButton,
  argTypes: {
    rounded: { control: "boolean" },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
    fullWidth: { control: "boolean" },
    hideFilesName: { control: "boolean" },
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
    variant: {
      control: {
        type: "radio",
        options: ["text", "outlined", "contained"],
      },
    },
    size: {
      control: {
        type: "radio",
        options: ["small", "medium", "large"],
      },
    },
  },
} as Meta;

export const Default: Story<UploadButtonProps> = (args) => (
  <Grid container spacing={2}>
    <Grid item xs={12} container spacing={2}>
      <Grid item>
        <UploadButton color="default" {...args}>
          UploadButton
        </UploadButton>
      </Grid>
      <Grid item>
        <div style={{ color: "blueviolet" }}>
          <UploadButton color="inherit" {...args}>
            UploadButton
          </UploadButton>
        </div>
      </Grid>
      <Grid item>
        <UploadButton color="primary" {...args}>
          UploadButton
        </UploadButton>
      </Grid>
      <Grid item>
        <UploadButton color="secondary" {...args}>
          UploadButton
        </UploadButton>
      </Grid>
      <Grid item>
        <UploadButton color="text" {...args}>
          UploadButton
        </UploadButton>
      </Grid>
      <Grid item>
        <div
          style={{
            padding: 5,
            backgroundColor: "black",
          }}
        >
          <UploadButton
            startIcon={<Icomoon type="people-setting_2" color="white" />}
            color="white"
            {...args}
          >
            UploadButton
          </UploadButton>
        </div>
      </Grid>
      <Grid item>
        <UploadButton color="info" {...args}>
          UploadButton
        </UploadButton>
      </Grid>
      <Grid item>
        <UploadButton color="success" {...args}>
          UploadButton
        </UploadButton>
      </Grid>
      <Grid item>
        <UploadButton color="warning" {...args}>
          UploadButton
        </UploadButton>
      </Grid>
      <Grid item>
        <UploadButton color="error" {...args}>
          UploadButton
        </UploadButton>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <div
        style={{
          padding: 5,
          display: "inline-block",
          backgroundColor: args.color === "white" ? "black" : undefined,
        }}
      >
        <UploadButton {...args}>UploadButton</UploadButton>
      </div>
    </Grid>
    <Grid item xs={12}>
      <UploadButton {...args}>UploadButton</UploadButton>
    </Grid>
  </Grid>
);

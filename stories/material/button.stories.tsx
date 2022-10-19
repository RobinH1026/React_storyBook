import React from "react";
import { Meta, Story } from "@storybook/react";

import makeStyles from "@mui/styles/makeStyles";
import Grid from "@eGroupAI/material/Grid";
import Button, { ButtonProps } from "@eGroupAI/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Icomoon from "@eGroupAI/material/Icomoon";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    rounded: { control: "boolean" },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
    fullWidth: { control: "boolean" },
    color: {
      control: {
        type: "radio",
        options: [
          "inherit",
          "primary",
          "secondary",
          "default",
          "text",
          "grey",
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

export const Default: Story<ButtonProps> = (args) => (
  <Grid container spacing={2}>
    <Grid item xs={12} container spacing={2}>
      <Grid item>
        <Button component="div" startIcon={<DeleteIcon />}>
          Default
        </Button>
        <Button component="div" startIcon={<DeleteIcon />} {...args}>
          Default
        </Button>
      </Grid>
      <Grid item>
        <div style={{ color: "blueviolet" }}>
          <Button startIcon={<DeleteIcon />} {...args} color="inherit">
            inherit
          </Button>
        </div>
      </Grid>
      <Grid item>
        <Button startIcon={<DeleteIcon />} {...args} color="primary">
          primary
        </Button>
      </Grid>
      <Grid item>
        <Button startIcon={<DeleteIcon />} {...args} color="secondary">
          secondary
        </Button>
      </Grid>
      <Grid item>
        <Button startIcon={<DeleteIcon />} {...args} color="text">
          text
        </Button>
      </Grid>
      <Grid item>
        <Button
          startIcon={<Icomoon type="people-setting_2" />}
          {...args}
          color="white"
        >
          White
        </Button>
      </Grid>
      <Grid item>
        <Button startIcon={<DeleteIcon />} {...args} color="info">
          info
        </Button>
      </Grid>
      <Grid item>
        <Button startIcon={<DeleteIcon />} {...args} color="success">
          success
        </Button>
      </Grid>
      <Grid item>
        <Button startIcon={<DeleteIcon />} {...args} color="warning">
          warning
        </Button>
      </Grid>
      <Grid item>
        <Button startIcon={<DeleteIcon />} {...args} color="error">
          error
        </Button>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Button startIcon={<DeleteIcon />} {...args}>
        Button
      </Button>
    </Grid>
  </Grid>
);

const useStyles = makeStyles(() => ({
  root: {
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: "6px 12px",
    border: "1px solid",
    lineHeight: 1.5,
    backgroundColor: "#0063cc !important",
    borderColor: "#0063cc",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      backgroundColor: "#0069d9",
      borderColor: "#0062cc",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#0062cc",
      borderColor: "#005cbf",
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    },
  },
}));

export const WithCustomized: Story<ButtonProps> = () => {
  const classes = useStyles();
  return (
    <Button variant="contained" classes={classes}>
      WithCustomized
    </Button>
  );
};

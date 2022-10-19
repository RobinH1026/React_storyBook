import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import Textarea, { TextareaProps } from "@eGroupAI/material/Textarea";
import { Grid } from "@mui/material";

export default {
  title: "Components/Textarea",
  component: Textarea,
} as Meta;

export const Default: Story<TextareaProps> = (args) => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <Grid container justifyContent="center" spacing={5}>
        <Grid item xs={4}>
          <Textarea
            minRows={5}
            placeholder="Hint Text for Textarea"
            {...args}
          />
        </Grid>
        <Grid item xs={4}>
          <Textarea
            minRows={5}
            defaultValue="Typing the details in Textarea"
            {...args}
          />
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Grid container justifyContent="center" spacing={5}>
        <Grid item xs={4}>
          <Textarea
            minRows={5}
            error
            defaultValue="Typing the details in Textarea"
            {...args}
          />
        </Grid>
        <Grid item xs={4}>
          <Textarea
            minRows={5}
            success
            defaultValue="Textarea Completed"
            {...args}
          />
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Grid container justifyContent="center" spacing={5}>
        <Grid item xs={4}>
          <Textarea
            minRows={5}
            warning
            defaultValue="Typing the details in Textarea"
            {...args}
          />
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

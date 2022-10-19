import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import TextField, { TextFieldProps } from "@eGroupAI/material/TextField";
import { Grid } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

export default {
  title: "Components/TextField",
  component: TextField,
} as Meta;

export const Default: Story<TextFieldProps> = () => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <Grid container justifyContent="center" spacing={5}>
        <Grid item xs={4}>
          <TextField fullWidth placeholder="Hint Text" rounded />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="TextField"
            InputProps={{
              startAdornment: <PersonIcon />,
            }}
            placeholder="UserName"
            disabled
          />
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Grid container justifyContent="center" spacing={5}>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="TextField"
            placeholder="Hint Text with Hover"
            shadowed
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="TextField"
            InputProps={{
              startAdornment: <PersonIcon />,
            }}
            placeholder="UserName"
          />
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Grid container justifyContent="center" spacing={5}>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="TextField"
            placeholder="Hint Text with Focused"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="TextField"
            InputProps={{ startAdornment: <PersonIcon /> }}
            placeholder="UserName"
          />
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Grid container justifyContent="center" spacing={5}>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="TextField"
            placeholder="Hint Text with Typing"
            defaultValue="Typing"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="TextField"
            InputProps={{ startAdornment: <PersonIcon /> }}
            defaultValue="Typing"
          />
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Grid container justifyContent="center" spacing={5}>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="TextField"
            warning
            defaultValue="Warning"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="TextField"
            warning
            InputProps={{ startAdornment: <PersonIcon /> }}
            placeholder="UserName"
          />
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Grid container justifyContent="center" spacing={5}>
        <Grid item xs={4}>
          <TextField fullWidth label="TextField" error defaultValue="Error" />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="TextField"
            error
            InputProps={{ startAdornment: <PersonIcon /> }}
            placeholder="UserName"
          />
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Grid container justifyContent="center" spacing={5}>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="TextField"
            success
            defaultValue="Success"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="TextField"
            success
            InputProps={{ startAdornment: <PersonIcon /> }}
            placeholder="UserName"
          />
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

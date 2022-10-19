import React, { useState } from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import Icomoon, { IcomoonProps } from "@eGroupAI/material/Icomoon";

import { Grid, Typography } from "@mui/material";
import TextField from "@eGroupAI/material/TextField";

const getIcons = () => {
  let cssRules: any = [];
  for (let i = 0; i < document.styleSheets.length; i++) {
    const styleSheet = document.styleSheets[i];
    cssRules = [...(cssRules as any), ...(styleSheet.cssRules as any)];
  }
  const iconClassnames = (
    cssRules.map((el) => el.selectorText) as string[]
  ).filter((el) => el && el.includes(".icon-"));
  return iconClassnames.map((el) =>
    el.replace(".icon-", "").replace("::before", "")
  );
};

const icons = getIcons();

export default {
  title: "Components/Icomoon",
  component: Icomoon,
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
  },
} as Meta;

export const Default: Story<IcomoonProps> = (args) => {
  const [filteredIcons, setFilteredIcons] = useState(icons);

  const handleChange = (e) => {
    setFilteredIcons(icons.filter((el) => el.includes(e.target.value)));
  };

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}
      >
        <TextField
          placeholder="Search icon"
          rounded
          variant="outlined"
          shadowed
          onChange={handleChange}
        />
      </div>
      <Grid container spacing={2}>
        {filteredIcons.map((el) => (
          <Grid item xs={1}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <div>
                <div
                  style={{
                    display: "inline-block",
                    padding: "5px",
                    borderRadius: "5px",
                    boxShadow: "0 0 10px -1px #00000042",
                    cursor: "pointer",
                    background: args.color !== "white" ? "white" : "black",
                  }}
                >
                  <Icomoon type={el} {...args} />
                </div>
              </div>
              <Typography variant="body2" noWrap>
                {el}
              </Typography>
            </div>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

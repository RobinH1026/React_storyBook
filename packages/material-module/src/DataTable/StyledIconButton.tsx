import React from "react";
import IconButton, { IconButtonProps } from "@eGroupAI/material/IconButton";

const StyledIconButton = (props: IconButtonProps) => (
  <IconButton
    sx={{
      color: "#9E9E9E",
      padding: 0,
      left: "3px",
    }}
    {...props}
  />
);

export default StyledIconButton;

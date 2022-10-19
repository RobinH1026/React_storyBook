import React from "react";
import Button, { ButtonProps } from "@eGroupAI/material/Button";

const StyledButton = (props: ButtonProps) => (
  <Button
    sx={{
      borderRadius: "1000px",
    }}
    {...props}
  />
);

export default StyledButton;

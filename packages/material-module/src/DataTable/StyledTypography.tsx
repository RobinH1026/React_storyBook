import React from "react";
import Typography, { TypographyProps } from "@eGroupAI/material/Typography";

const StyledTypography = (props: TypographyProps) => (
  <Typography
    sx={{
      fontSize: "15px",
      color: "#9E9E9E",
    }}
    {...props}
  />
);

export default StyledTypography;

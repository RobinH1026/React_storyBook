import React from "react";
import Chip, { ChipProps } from "@eGroupAI/material/Chip";

const StyledChip = (props: ChipProps) => (
  <Chip
    sx={{
      backgroundColor: "#239682",
      color: "white",
    }}
    {...props}
  />
);

export default StyledChip;

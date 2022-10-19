import React from "react";
import ListItemText, {
  ListItemTextProps,
} from "@eGroupAI/material/ListItemText";

const StyledListItemText = (props: ListItemTextProps) => (
  <ListItemText
    sx={{
      "& .MuiListItemText-primary": {
        color: "#9E9E9E",
      },
      "& .MuiListItemText-secondary": {
        color: "#9E9E9E",
      },
    }}
    {...props}
  />
);

export default StyledListItemText;

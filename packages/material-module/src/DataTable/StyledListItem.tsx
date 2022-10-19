import React from "react";
import ListItem, { ListItemProps } from "@eGroupAI/material/ListItem";

const StyledListItem = (props: ListItemProps) => (
  <ListItem
    sx={{
      padding: 0,
    }}
    {...props}
  />
);

export default StyledListItem;

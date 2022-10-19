import React from "react";
import { Story, Meta } from "@storybook/react";

import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import ButtonMenu, {
  ButtonMenuProps,
} from "@eGroupAI/material-module/ButtonMenu";

export default {
  title: "Modules/ButtonMenu",
  component: ButtonMenu,
  argTypes: { onClose: { action: "closed" } },
} as Meta;

export const Default: Story<ButtonMenuProps> = (args) => (
  <ButtonMenu
    {...args}
    button={
      <Button onClick={() => console.log("button clicked")}>button</Button>
    }
  >
    <MenuItem onClick={() => console.log("item1 clicked")}>
      item1item1item1
    </MenuItem>
    <MenuItem onClick={() => console.log("item2 clicked")}>item2</MenuItem>
  </ButtonMenu>
);

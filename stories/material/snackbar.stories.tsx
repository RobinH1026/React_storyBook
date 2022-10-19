import React, { ReactNode } from "react";
import { Meta, Story } from "@storybook/react";

import { Provider } from "react-redux";
import Snackbar, { SnackbarProps } from "@eGroupAI/material/Snackbar";
import { withReduxSnackbar } from "@eGroupAI/redux-modules/snackbars";
import useReduxSnackbar from "@eGroupAI/redux-modules/snackbars/useReduxSnackbar";
import { Button } from "@mui/material";
import { store } from "stories/storyUtils/configureStore";

export default {
  title: "Components/Snackbar",
  component: Snackbar,
  argTypes: {
    primary: { control: "text", defaultValue: "Primary" },
    message: { control: "text", defaultValue: "Message" },
    isOpen: { control: "boolean", defaultValue: true },
    onClose: { action: "closed" },
    onCloseClick: { action: "clicked" },
    anchorOrigin: {
      control: "object",
      defaultValue: {
        vertical: "top",
        horizontal: "center",
      },
    },
  },
} as Meta;

export const Default: Story<SnackbarProps> = (args) => <Snackbar {...args} />;

interface ReduxSnackbarProps {
  message: ReactNode;
}
const reduxSnackbar = "reduxSnackbar";
const ReduxSnackbar = withReduxSnackbar(reduxSnackbar)<
  any,
  SnackbarProps & ReduxSnackbarProps
>(Snackbar);
const OpenButton = () => {
  const { openSnackbar } = useReduxSnackbar<SnackbarProps>(reduxSnackbar);
  return (
    <Button
      onClick={() =>
        openSnackbar({
          message: "更新成功!",
          severity: "success",
        })
      }
    >
      OPEN SNACKBAR
    </Button>
  );
};
export const WithReduxSnackbar: Story<SnackbarProps> = (args) => (
  <Provider store={store}>
    <OpenButton />
    <ReduxSnackbar
      message={args.message}
      AlertProps={{
        variant: "filled",
      }}
    />
  </Provider>
);

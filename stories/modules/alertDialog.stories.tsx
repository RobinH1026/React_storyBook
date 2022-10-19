import React, { FC } from "react";

import { Meta } from "@storybook/react";

import AlertDialog from "@eGroupAI/material-module/AlertDialog";
import {
  withReduxDialog,
  openDialog,
  useReduxDialog,
  setDialogData,
} from "@eGroupAI/redux-modules/dialogs";
import { Provider, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { store } from "stories/storyUtils/configureStore";

export default {
  title: "Modules/AlertDialog",
  component: AlertDialog,
  argTypes: {
    primary: { control: "text", defaultValue: "Title" },
    message: { control: "text", defaultValue: "Message" },
    isOpen: { control: "boolean", defaultValue: true },
    fullWidth: { control: "boolean", defaultValue: true },
    onClose: { action: "closed" },
  },
} as Meta;

export const Default: FC = (args) => <AlertDialog {...args} />;

interface ReduxDialogProps {
  message: string;
}
const reduxDialog = "reduxDialog";
const ReduxDialog = withReduxDialog(reduxDialog)<any, ReduxDialogProps>(
  AlertDialog
);

const OpenButton = () => {
  const dispatch = useDispatch();
  return (
    <Button onClick={() => dispatch(openDialog(reduxDialog))}>
      OPEN DIALOG
    </Button>
  );
};
export const WithReduxDialog: FC = ({ children, ...args }) => (
  <Provider store={store}>
    <OpenButton />
    <ReduxDialog message={(args as any).message} />
  </Provider>
);

type ExtendStateProps = {
  primary?: string;
  message?: string;
};
const REDUX_HOOK_DIALOG = "reduxDialog";
const ReduxHookDialog = () => {
  const { closeDialog, isOpen, primary, message } =
    useReduxDialog<ExtendStateProps>(REDUX_HOOK_DIALOG);

  return (
    <AlertDialog
      handleClose={closeDialog}
      open={isOpen}
      primary={primary}
      message={message}
    />
  );
};
const OpenHookButton = ({ primary, message }) => {
  const dispatch = useDispatch();
  return (
    <Button
      onClick={() => {
        dispatch(
          setDialogData({
            name: REDUX_HOOK_DIALOG,
            primary,
            message,
          })
        );
        dispatch(openDialog(REDUX_HOOK_DIALOG));
      }}
    >
      OPEN DIALOG
    </Button>
  );
};

export const UseReduxDialog: FC = ({ children, ...args }) => (
  <Provider store={store}>
    <OpenHookButton
      primary={(args as any).primary}
      message={(args as any).message}
    />
    <ReduxHookDialog />
  </Provider>
);

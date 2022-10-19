import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeDialog as reduxCloseDialog,
  openDialog as reduxOpenDialog,
  initializeDialog,
  setDialogData,
} from "./actions";
import { getDialogStates } from "./selectors";
import { ReduxDialogStateProps } from "./withReduxDialog";

export default function useReduxDialog<ExtendStateProps = unknown>(
  name: string
) {
  const dispatch = useDispatch();
  const states = useSelector<unknown, ExtendStateProps & ReduxDialogStateProps>(
    (state) => ({
      ...getDialogStates(state, name),
    })
  );

  useEffect(() => {
    dispatch(initializeDialog(name));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeDialog = useCallback(() => {
    dispatch(reduxCloseDialog(name));
  }, [name, dispatch]);

  const openDialog = useCallback(
    (options?: ExtendStateProps) => {
      dispatch(
        setDialogData({
          name,
          ...options,
        })
      );
      dispatch(reduxOpenDialog(name));
    },
    [name, dispatch]
  );

  return {
    closeDialog,
    openDialog,
    ...states,
  };
}

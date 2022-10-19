import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSnackbarData as reduxSetSnackbarData,
  openSnackbar as reduxOpenSnackbar,
  closeSnackbar as reduxCloseSnackbar,
  initializeSnackbar,
} from "./actions";
import { getSnackbarStates } from "./selectors";
import { ReduxSnackbarStateProps } from "./withReduxSnackbar";

export default function useReduxSnackbar<ExtendStateProps = unknown>(
  name: string
) {
  const dispatch = useDispatch();
  const states = useSelector<
    unknown,
    ExtendStateProps & ReduxSnackbarStateProps
  >((state) => ({
    ...getSnackbarStates(state, name),
  }));

  useEffect(() => {
    initializeSnackbar(name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setSnackbarData = useCallback(
    (options?: ExtendStateProps) => {
      dispatch(
        reduxSetSnackbarData({
          name,
          ...options,
        })
      );
    },
    [dispatch, name]
  );

  const openSnackbar = useCallback(
    (options?: ExtendStateProps) => {
      setSnackbarData(options);
      dispatch(reduxOpenSnackbar(name));
    },
    [dispatch, name, setSnackbarData]
  );

  const closeSnackbar = useCallback(
    (options?: ExtendStateProps) => {
      setSnackbarData(options);
      dispatch(reduxCloseSnackbar(name));
    },
    [dispatch, name, setSnackbarData]
  );

  return {
    setSnackbarData,
    openSnackbar,
    closeSnackbar,
    ...states,
  };
}

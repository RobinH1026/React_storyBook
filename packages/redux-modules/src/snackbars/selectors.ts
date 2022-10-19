import getIn from "@eGroupAI/utils/getIn";

export const getSnackbarStates = (state: any, name: string) =>
  getIn(state, ["snackbars", name], {});

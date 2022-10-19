import getIn from "@eGroupAI/utils/getIn";

export const getDialogStates = (state: any, name: string) =>
  getIn(state, ["dialogs", name], {
    isOpen: false,
  });

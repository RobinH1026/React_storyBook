import { Map } from 'immutable';

export const getDialogStates = (state: any, name: string) =>
  state.getIn(
    ['dialogs', name],
    Map({
      isOpen: false,
    })
  );

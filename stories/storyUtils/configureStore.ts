import { createStore, combineReducers } from "redux";

import { reducer as formReducer } from "redux-form";
import { snackbars } from "@eGroupAI/redux-modules/snackbars";
import { dialogs } from "@eGroupAI/redux-modules/dialogs";
import { composeWithDevTools } from "redux-devtools-extension";

// create store
export const store = createStore(
  combineReducers({
    form: formReducer,
    snackbars,
    dialogs,
  }),
  composeWithDevTools()
);

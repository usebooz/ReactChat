import { combineReducers } from "redux";

import { connectRouter } from "connected-react-router";

import { usersReducer } from "./usersReducer";
import { contactsReducer } from "./contactsReducer";
import { chatsReducer } from "./chatsReducer";
import { messagesReducer } from "./messagesReducer";
import { commonReducer } from "./commonReducer";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    usersReducer,
    contactsReducer,
    chatsReducer,
    messagesReducer,
    commonReducer,
  });

export default createRootReducer;

import thunk from "redux-thunk";
import { apiMiddleware } from "redux-api-middleware";

import { usersMiddleware } from "./usersMiddleware";
import { chatsMiddleware } from "./chatsMiddleware";
import { messagesMiddleware } from "./messagesMiddleware";

export default [
  thunk,
  apiMiddleware,
  chatsMiddleware,  
  usersMiddleware,
  messagesMiddleware,
];

import { push } from "connected-react-router";

import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../constants/actionTypes";

export const usersMiddleware = (store) => (next) => (action) => {
  let result;
  switch (action.type) {
    case LOGIN_SUCCESS:
      result = next(action);
      store.dispatch(push(`/user/${action.payload.user.userId}/`));
      break;
    case LOGOUT_SUCCESS:
      store.dispatch(push("/login"));
      result = next(action);
      break;
    default:
      result = next(action);
      break;
  }
  return result;
};

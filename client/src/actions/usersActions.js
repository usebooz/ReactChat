import { RSAA, getJSON } from "redux-api-middleware";

import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_START,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  LOGOUT_START,
} from "../constants/actionTypes.js";

export const logInUser = (userData) => ({
  [RSAA]: {
    endpoint: "/api/login",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
    types: [
      LOGIN_START,
      {
        type: LOGIN_SUCCESS,
        payload: (action, state, res) =>
          getJSON(res).then((json) => ({ user: json })),
      },
      {
        type: LOGIN_ERROR,
        payload: (action, state, res) =>
          getJSON(res).then((json) => ({ error: json })),
      },
    ],
  },
});

export const logOutUser = () => ({
  [RSAA]: {
    endpoint: "/api/logout",
    method: "POST",
    types: [LOGOUT_START, LOGOUT_SUCCESS, LOGOUT_ERROR],
  },
});

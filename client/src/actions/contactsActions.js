import { RSAA, getJSON } from "redux-api-middleware";

import {
  RECEIVE_CONTACTS_ERROR,
  RECEIVE_CONTACTS_START,
  RECEIVE_CONTACTS_SUCCESS,
} from "../constants/actionTypes.js";

export const receiveContacts = (userId) => ({
  [RSAA]: {
    endpoint: `/api/user/${userId}/contacts`,
    method: "GET",
    types: [
      RECEIVE_CONTACTS_START,
      {
        type: RECEIVE_CONTACTS_SUCCESS,
        payload: (action, state, res) =>
          getJSON(res).then((json) => ({ contacts: json })),
      },
      RECEIVE_CONTACTS_ERROR,
    ],
  },
});

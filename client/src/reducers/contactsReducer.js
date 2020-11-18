import update from "react-addons-update";

import {
  RECEIVE_CONTACTS_ERROR,
  RECEIVE_CONTACTS_START,
  RECEIVE_CONTACTS_SUCCESS,
} from "../constants/actionTypes";

const initStore = {
  contacts: [],
};

export const contactsReducer = (store = initStore, action) => {
  switch (action.type) {
    case RECEIVE_CONTACTS_SUCCESS:
      return update(store, {
        contacts: {
          $set: action.payload.contacts,
        },
      });
    default:
      return store;
  }
};

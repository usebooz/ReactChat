import update from "react-addons-update";

import {
  INIT_MESSAGE,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_START,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  RECEIVE_CONTACTS_START,
  RECEIVE_CONTACTS_SUCCESS,
  RECEIVE_CONTACTS_ERROR,
  RECEIVE_CHATS_START,
  RECEIVE_CHATS_SUCCESS,
  RECEIVE_CHATS_ERROR,
  ADD_CHAT_START,
  ADD_CHAT_SUCCESS,
  ADD_CHAT_ERROR,
  REMOVE_CHAT_START,
  REMOVE_CHAT_SUCCESS,
  REMOVE_CHAT_ERROR,
  CHANGE_CHAT_START,
  CHANGE_CHAT_SUCCESS,
  CHANGE_CHAT_ERROR,
  ADD_MESSAGE_START,
  ADD_MESSAGE_SUCCESS,
  ADD_MESSAGE_ERROR,
  REMOVE_MESSAGES_START,
  REMOVE_MESSAGES_SUCCESS,
  REMOVE_MESSAGES_ERROR,
  REMOVE_MESSAGE_START,
  REMOVE_MESSAGE_SUCCESS,
  REMOVE_MESSAGE_ERROR,
  CHANGE_MESSAGE_START,
  CHANGE_MESSAGE_SUCCESS,
  CHANGE_MESSAGE_ERROR,
} from "../constants/actionTypes";

const initStore = {
  message: null,
  spinner: null,
};

export const commonReducer = (store = initStore, action) => {
  let commonStore = store;
  switch (action.type) {
    case INIT_MESSAGE:
      commonStore = update(commonStore, { message: { $set: null } });
      break;
    case ADD_CHAT_START:
    // case ADD_MESSAGE_START:
    // case CHANGE_CHAT_START:
    // case CHANGE_MESSAGE_START:
    case LOGIN_START:
    case LOGOUT_START:
    case RECEIVE_CHATS_START:
    case RECEIVE_CONTACTS_START:
    case REMOVE_CHAT_START:
    case REMOVE_MESSAGES_START:
    case REMOVE_MESSAGE_START:
      commonStore = update(commonStore, { spinner: { $set: true } });
      break;
    case REMOVE_CHAT_SUCCESS:
    case REMOVE_MESSAGES_SUCCESS:
    case REMOVE_MESSAGE_SUCCESS:
      commonStore = update(commonStore, {
        message: { $set: action.payload.message },
      });
    case ADD_CHAT_SUCCESS:
    // case ADD_MESSAGE_SUCCESS:
    // case CHANGE_CHAT_SUCCESS:
    // case CHANGE_MESSAGE_SUCCESS:
    case LOGIN_SUCCESS:
    case LOGOUT_SUCCESS:
    case RECEIVE_CHATS_SUCCESS:
    case RECEIVE_CONTACTS_SUCCESS:
    case ADD_CHAT_ERROR:
    // case ADD_MESSAGE_ERROR:
    // case CHANGE_CHAT_ERROR:
    // case CHANGE_MESSAGE_ERROR:
    case LOGIN_ERROR:
    case LOGOUT_ERROR:
    case RECEIVE_CHATS_ERROR:
    case RECEIVE_CONTACTS_ERROR:
    case REMOVE_CHAT_ERROR:
    case REMOVE_MESSAGES_ERROR:
    case REMOVE_MESSAGE_ERROR:
      commonStore = update(commonStore, { spinner: { $set: false } });
      break;
  }
  return commonStore;
};

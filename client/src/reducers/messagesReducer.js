import update from "react-addons-update";

import {
  RECEIVE_CHATS_SUCCESS,
  ADD_MESSAGE_SUCCESS,
  REMOVE_MESSAGES_SUCCESS,
  REMOVE_MESSAGE_SUCCESS,
  REMOVE_CHAT_SUCCESS,
  CHANGE_MESSAGE_SUCCESS,
  SCROLL_MESSAGE,
} from "../constants/actionTypes";

const initStore = {
  messages: {},
  messageId: "",
};

export const messagesReducer = (store = initStore, action) => {
  let messages;
  switch (action.type) {
    case RECEIVE_CHATS_SUCCESS:
      return update(store, {
        messages: {
          $set: action.payload.messages ? action.payload.messages : {},
        },
      });

    case ADD_MESSAGE_SUCCESS:
      return update(store, {
        messages: {
          $merge: action.payload.messages,
        },
      });

    case REMOVE_CHAT_SUCCESS:
    case REMOVE_MESSAGES_SUCCESS:
      messages = store.messages;
      for (const [id, message] of Object.entries(messages)) {
        message.chatId === action.payload.chatId && delete messages[id];
      }
      return update(store, {
        messages: {
          $set: messages,
        },
      });

    case REMOVE_MESSAGE_SUCCESS:
      messages = store.messages;
      delete messages[action.payload.messageId];
      return update(store, {
        messages: {
          $set: messages,
        },
      });

    case CHANGE_MESSAGE_SUCCESS:
      return update(store, {
        messages: {
          $merge: action.payload.messages,
        },
      });

    case SCROLL_MESSAGE:
      return update(store, {
        messageId: {
          $set: action.payload.messageId,
        },
      });

    default:
      return store;
  }
};

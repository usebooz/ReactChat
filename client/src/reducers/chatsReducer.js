import update from "react-addons-update";

import {
  RECEIVE_CHATS_SUCCESS,
  ADD_CHAT_SUCCESS,
  REMOVE_CHAT_SUCCESS,
  SWITCH_CHAT,
  EXIT_CHAT,
  CHANGE_CHAT_SUCCESS,
  CHANGE_LAST_MESSAGE,
  REDUCE_UNREAD_COUNT,
  ADD_MESSAGE_SUCCESS,
  REMOVE_MESSAGES_SUCCESS,
  REMOVE_MESSAGE_SUCCESS,
} from "../constants/actionTypes";

const initStore = {
  chats: {},
  chatId: "",
};

export const chatsReducer = (store = initStore, action) => {
  let chats, message;
  switch (action.type) {
    case RECEIVE_CHATS_SUCCESS:
      return update(store, {
        chats: {
          $set: action.payload.chats ? action.payload.chats : {},
        },
      });

    case ADD_CHAT_SUCCESS:
      return update(store, {
        chats: {
          $merge: action.payload.chats,
        },
      });

    case REMOVE_CHAT_SUCCESS:
      chats = store.chats;
      delete chats[action.payload.chatId];
      return update(store, {
        chats: {
          $set: chats,
        },
      });

    case SWITCH_CHAT:
      return update(store, {
        chatId: {
          $set: action.payload.chatId,
        },
      });

    case EXIT_CHAT:
      return update(store, {
        chatId: {
          $set: "",
        },
      });

    case CHANGE_CHAT_SUCCESS:
      return update(store, {
        chats: {
          $merge: action.payload.chats,
        },
      });

    case CHANGE_LAST_MESSAGE:
      message = action.payload.message;
      return update(store, {
        chats: {
          [message.chatId]: {
            lastMessage: {
              $set: message.messageText,
            },
          },
        },
      });

    case REDUCE_UNREAD_COUNT:
      return update(store, {
        chats: {
          [action.payload.chatId]: {
            unreadCount: {
              $apply: (unreadCount) => (unreadCount ? unreadCount - 1 : 0),
            },
          },
        },
      });

    case ADD_MESSAGE_SUCCESS:
      message = Object.entries(action.payload.messages)[0][1];
      return update(store, {
        chats: {
          [message.chatId]: {
            messages: {
              $push: [message.messageId],
            },
          },
        },
      });

    case REMOVE_MESSAGES_SUCCESS:
      return update(store, {
        chats: {
          [action.payload.chatId]: {
            messages: {
              $set: [],
            },
          },
        },
      });

    case REMOVE_MESSAGE_SUCCESS:
      return update(store, {
        chats: {
          [action.payload.chatId]: {
            messages: {
              $apply: (messages) => {
                messages.splice(messages.indexOf(action.payload.messageId), 1);
                return messages;
              },
            },
          },
        },
      });
      
    default:
      return store;
  }
};

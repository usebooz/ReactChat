import {
  ADD_MESSAGE_SUCCESS,
  SWITCH_CHAT,
  CHANGE_LAST_MESSAGE,
} from "../constants/actionTypes";

import {
  changeMessage,
  addMessage,
  scrollMessage,
} from "../actions/messagesActions";

export const messagesMiddleware = (store) => (next) => (action) => {
  const { messagesReducer, chatsReducer } = store.getState();
  let message, chat, result, messageId;
  switch (action.type) {
    case ADD_MESSAGE_SUCCESS:
      result = next(action);
      message = Object.entries(action.payload.messages)[0][1];
      chat = chatsReducer.chats[message.chatId];
      if (message.userId === message.senderId && chat.bot) {
        setTimeout(() => {
          store.dispatch(
            changeMessage(message.userId, message.chatId, message.messageId, {
              status: "READ",
            })
          );
        }, 300);
        setTimeout(() => {
          store.dispatch(
            addMessage(message.userId, message.chatId, {
              senderId: message.chatId,
              messageText: message.messageText,
            })
          );
        }, 600);
      }
      message.chatId === message.senderId &&
        message.chatId === chatsReducer.chatId &&
        store.dispatch(
          changeMessage(message.userId, message.chatId, message.messageId, {
            status: "READ",
          })
        );
      break;
    case SWITCH_CHAT:
      result = next(action);
      for (const [id, message] of Object.entries(messagesReducer.messages)) {
        message.chatId === action.payload.chatId &&
          message.chatId === message.senderId &&
          message.status === "SENT" &&
          store.dispatch(
            changeMessage(message.userId, message.chatId, message.messageId, {
              status: "READ",
            })
          );
        if (message.chatId === action.payload.chatId) messageId = id;
      }
      store.dispatch(scrollMessage(messageId));
      break;

    case CHANGE_LAST_MESSAGE:
      result = next(action);
      store.dispatch(scrollMessage(action.payload.message.messageId));
      break;

    default:
      result = next(action);
      break;
  }
  return result;
};

import { push } from "connected-react-router";

import {
  ADD_CHAT_SUCCESS,
  REMOVE_CHAT_SUCCESS,
  SWITCH_CHAT,
  EXIT_CHAT,
  ADD_MESSAGE_SUCCESS,
  CHANGE_MESSAGE_SUCCESS,
  REMOVE_MESSAGES_SUCCESS,
  REMOVE_MESSAGE_SUCCESS,
  LOGOUT_SUCCESS,
} from "../constants/actionTypes";

import {
  switchChat,
  exitChat,
  changeChat,
  changeLastMessage,
  reduceUnreadCount,
} from "../actions/chatsActions";

export const chatsMiddleware = (store) => (next) => (action) => {
  const { chatsReducer, messagesReducer, router } = store.getState();
  let message, result;
  switch (action.type) {
    case ADD_CHAT_SUCCESS:
      result = next(action);
      store.dispatch(switchChat(Object.keys(action.payload.chats)[0]));
      break;

    case REMOVE_CHAT_SUCCESS:
      chatsReducer.chatId === action.payload.chatId &&
        store.dispatch(exitChat());
      result = next(action);
      break;

    case SWITCH_CHAT:
      result = next(action);
      if (router.location.pathname.includes("chat")) {
        store.dispatch(push(`./${action.payload.chatId}`));
      } else {
        store.dispatch(push(`./chat/${action.payload.chatId}`));
      }
      break;

    case EXIT_CHAT:
      result = next(action);
      store.dispatch(push("../"));
      break;

    case ADD_MESSAGE_SUCCESS:
      result = next(action);
      message = Object.entries(action.payload.messages)[0][1];
      message.userId === message.senderId &&
        store.dispatch(
          changeChat(message.userId, message.chatId, { message: "" })
        );
      store.dispatch(changeLastMessage(message));
      break;

    case REMOVE_MESSAGES_SUCCESS:
      result = next(action);
      store.dispatch(
        changeLastMessage({ chatId: action.payload.chatId, messageText: "" })
      );
      break;

    case REMOVE_MESSAGE_SUCCESS:
      result = next(action);
      let messageText = "";
      for (const [id, message] of Object.entries(messagesReducer.messages)) {
        if (message.chatId === action.payload.chatId)
          messageText = message.messageText;
      }
      chatsReducer.lastMessage !== messageText &&
        store.dispatch(
          changeLastMessage({
            chatId: action.payload.chatId,
            messageText: messageText,
          })
        );
      break;

    case CHANGE_MESSAGE_SUCCESS:
      result = next(action);
      message = Object.entries(action.payload.messages)[0][1];
      action.payload.status === "READ" &&
        store.dispatch(reduceUnreadCount(message.chatId));
      break;

    case LOGOUT_SUCCESS:
      store.dispatch(exitChat());
      result = next(action);
      break;

    default:
      result = next(action);
      break;
  }
  return result;
};

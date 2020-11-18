import { RSAA, getJSON } from "redux-api-middleware";

import { normalize } from "normalizr";
import { chat } from "../utils/schemas";

import {
  RECEIVE_CHATS_ERROR,
  RECEIVE_CHATS_START,
  RECEIVE_CHATS_SUCCESS,
  ADD_CHAT_ERROR,
  ADD_CHAT_START,
  ADD_CHAT_SUCCESS,
  REMOVE_CHAT_ERROR,
  REMOVE_CHAT_START,
  REMOVE_CHAT_SUCCESS,
  SWITCH_CHAT,
  EXIT_CHAT,
  CHANGE_CHAT_ERROR,
  CHANGE_CHAT_START,
  CHANGE_CHAT_SUCCESS,
  CHANGE_LAST_MESSAGE,
  REDUCE_UNREAD_COUNT,
} from "../constants/actionTypes.js";

export const receiveChats = (userId) => ({
  [RSAA]: {
    endpoint: `/api/${userId}/chats`,
    method: "GET",
    types: [
      RECEIVE_CHATS_START,
      {
        type: RECEIVE_CHATS_SUCCESS,
        payload: (action, state, res) =>
          getJSON(res).then((json) => normalize(json, [chat]).entities),
      },
      RECEIVE_CHATS_ERROR,
    ],
  },
});

export const addChat = (userId, chatId) => ({
  [RSAA]: {
    endpoint: `/api/${userId}/chat/${chatId}`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    types: [
      ADD_CHAT_START,
      {
        type: ADD_CHAT_SUCCESS,
        payload: (action, state, res) =>
          getJSON(res).then((json) => normalize(json, chat).entities),
      },
      ADD_CHAT_ERROR,
    ],
  },
});

export const removeChat = (userId, chatId) => ({
  [RSAA]: {
    endpoint: `/api/${userId}/chat/${chatId}`,
    method: "DELETE",
    types: [
      REMOVE_CHAT_START,
      {
        type: REMOVE_CHAT_SUCCESS,
        payload: (action, state, res) =>
          getJSON(res).then((json) => ({ chatId: chatId, message: json })),
      },
      REMOVE_CHAT_ERROR,
    ],
  },
});

export const switchChat = (chatId) => ({
  type: SWITCH_CHAT,
  payload: {
    chatId: chatId,
  },
});

export const exitChat = () => ({
  type: EXIT_CHAT,
});

export const changeChat = (userId, chatId, chatData) => ({
  [RSAA]: {
    endpoint: `/api/${userId}/chat/${chatId}`,
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(chatData),
    types: [
      CHANGE_CHAT_START,
      {
        type: CHANGE_CHAT_SUCCESS,
        payload: (action, state, res) =>
          getJSON(res).then((json) => normalize(json, chat).entities),
      },
      CHANGE_CHAT_ERROR,
    ],
  },
});

export const changeLastMessage = (message) => ({
  type: CHANGE_LAST_MESSAGE,
  payload: {
    message: message,
  },
});

export const reduceUnreadCount = (chatId, count) => ({
  type: REDUCE_UNREAD_COUNT,
  payload: {
    chatId: chatId
  },
});

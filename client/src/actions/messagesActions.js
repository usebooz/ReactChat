import { RSAA, getJSON } from "redux-api-middleware";

import { normalize } from "normalizr";
import { message } from "../utils/schemas";

import {
  ADD_MESSAGE_ERROR,
  ADD_MESSAGE_START,
  ADD_MESSAGE_SUCCESS,
  REMOVE_MESSAGES_ERROR,
  REMOVE_MESSAGES_START,
  REMOVE_MESSAGES_SUCCESS,
  REMOVE_MESSAGE_ERROR,
  REMOVE_MESSAGE_START,
  REMOVE_MESSAGE_SUCCESS,
  CHANGE_MESSAGE_ERROR,
  CHANGE_MESSAGE_START,
  CHANGE_MESSAGE_SUCCESS,
  SCROLL_MESSAGE,
} from "../constants/actionTypes.js";

export const addMessage = (userId, chatId, messageData) => ({
  [RSAA]: {
    endpoint: `/api/user/${userId}/chat/${chatId}/message`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(messageData),
    types: [
      ADD_MESSAGE_START,
      {
        type: ADD_MESSAGE_SUCCESS,
        payload: (action, state, res) =>
          getJSON(res).then((json) => normalize(json, message).entities),
      },
      ADD_MESSAGE_ERROR,
    ],
  },
});

export const removeMessages = (userId, chatId) => ({
  [RSAA]: {
    endpoint: `/api/user/${userId}/chat/${chatId}/messages`,
    method: "DELETE",
    types: [
      REMOVE_MESSAGES_START,
      {
        type: REMOVE_MESSAGES_SUCCESS,
        payload: (action, state, res) =>
          getJSON(res).then((json) => ({ chatId: chatId, message: json })),
      },
      REMOVE_MESSAGES_ERROR,
    ],
  },
});

export const removeMessage = (userId, chatId, messageId) => ({
  [RSAA]: {
    endpoint: `/api/user/${userId}/chat/${chatId}/message/${messageId}`,
    method: "DELETE",
    types: [
      REMOVE_MESSAGE_START,
      {
        type: REMOVE_MESSAGE_SUCCESS,
        payload: (action, state, res) =>
          getJSON(res).then((json) => ({
            chatId: chatId,
            messageId: messageId,
            message: json,
          })),
      },
      REMOVE_MESSAGE_ERROR,
    ],
  },
});

export const changeMessage = (userId, chatId, messageId, messageData) => ({
  [RSAA]: {
    endpoint: `/api/user/${userId}/chat/${chatId}/message/${messageId}`,
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(messageData),
    types: [
      CHANGE_MESSAGE_START,
      {
        type: CHANGE_MESSAGE_SUCCESS,
        payload: (action, state, res) =>
          getJSON(res).then((json) => ({
            ...normalize(json, message).entities,
            ...messageData,
          })),
      },
      CHANGE_MESSAGE_ERROR,
    ],
  },
});

export const scrollMessage = (messageId) => ({
  type: SCROLL_MESSAGE,
  payload: {
    messageId: messageId,
  },
});

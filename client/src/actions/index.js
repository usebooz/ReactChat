import { logInUser, logOutUser } from "./usersActions";
import { receiveContacts } from "./contactsActions";
import {
  receiveChats,
  addChat,
  removeChat,
  switchChat,
  exitChat,
  changeChat,
} from "./chatsActions";
import {
  addMessage,
  removeMessages,
  removeMessage,
  scrollMessage,
} from "./messagesActions";
import { initMessage } from "./commonActions";

//Users
export const logIn = (userData) => (dispatch) => {
  dispatch(logInUser(userData));
};
export const logOut = () => (dispatch, getState) => {
  const user = getState().usersReducer.user;
  dispatch(logOutUser(user.userId));
};

//Contacts
export const loadContacts = () => (dispatch, getState) => {
  const user = getState().usersReducer.user;
  dispatch(receiveContacts(user.userId));
};

//Chats
export const loadChats = () => (dispatch, getState) => {
  const user = getState().usersReducer.user;
  dispatch(receiveChats(user.userId));
};
export const createChat = (chatId) => (dispatch, getState) => {
  const user = getState().usersReducer.user;
  dispatch(addChat(user.userId, chatId));
};
export const deleteChat = (userId) => (dispatch, getState) => {
  const user = getState().usersReducer.user;
  const chatId = userId ? userId : getState().chatsReducer.chatId;
  dispatch(removeChat(user.userId, chatId));
};
export const selectChat = (chatId) => (dispatch, getState) => {
  dispatch(switchChat(chatId));
};
export const unselectChat = () => (dispatch) => {
  dispatch(exitChat());
};
export const getUserChats = (state) => {
  const chats = state.chatsReducer.chats;
  return Object.entries(chats).map((chat) => chat[1]);
};
export const getSelectedChat = (state) => {
  const user = state.usersReducer.user;
  const chatId = state.chatsReducer.chatId;
  const messages = state.messagesReducer.messages;
  return {
    ...state.chatsReducer.chats[chatId],
    messages: Object.entries(messages)
      .map((message) => message[1])
      .filter((message) => message.chatId === chatId),
  };
};
export const inputMessage = (message) => (dispatch, getState) => {
  const user = getState().usersReducer.user;
  const chatId = getState().chatsReducer.chatId;
  dispatch(changeChat(user.userId, chatId, { message: message }));
};

//Messages
export const sendMessage = (replyText) => (dispatch, getState) => {
  const user = getState().usersReducer.user;
  const chatId = getState().chatsReducer.chatId;
  dispatch(
    addMessage(user.userId, chatId, {
      messageText: replyText
        ? replyText
        : getState().chatsReducer.chats[chatId].message,
      senderId: replyText ? chatId : user.userId,
    })
  );
};
export const clearMessages = (userId) => (dispatch, getState) => {
  const user = getState().usersReducer.user;
  const chatId = userId ? userId : getState().chatsReducer.chatId;
  dispatch(removeMessages(user.userId, chatId));
};
export const deleteMessage = (chatMessage) => (dispatch) => {
  dispatch(
    removeMessage(chatMessage.userId, chatMessage.chatId, chatMessage.messageId)
  );
};
export const scrollToMessage = (messageId) => (dispatch) => {
  dispatch(scrollMessage(messageId));
};

//Common
export const hideToast = () => (dispatch) => {
  dispatch(initMessage());
};

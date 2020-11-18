import express from "express";

import {
  getUser,
  signInUser,
  signOutUser,
  getUserContacts,
  getUserChats,
  getUserChat,
  createUserChat,
  updateUserChat,
  deleteUserChat,
  createUserChatMessage,
  updateUserChatMessage,
  deleteUserChatMessages,
  deleteUserChatMessage,
} from "./services/controller.mjs";

//Express
const server = express();
server.use(express.json());
server.use(express.static("./public/"));

//Users
server.get("/:userId", getUser);
server.post("/login", signInUser);
server.post("/logout", signOutUser);

//Contacts
server.get("/:userId/contacts", getUserContacts);

//Chats
server.get("/:userId/chats", getUserChats);
server.get("/:userId/chat/:chatId", getUserChat);
server.post("/:userId/chat/:chatId", createUserChat);
server.patch("/:userId/chat/:chatId", updateUserChat);
server.delete("/:userId/chat/:chatId", deleteUserChat);

//Messages
server.post("/:userId/chat/:chatId/message", createUserChatMessage);
server.patch("/:userId/chat/:chatId/message/:messageId", updateUserChatMessage);
server.delete("/:userId/chat/:chatId/messages", deleteUserChatMessages);
server.delete(
  "/:userId/chat/:chatId/message/:messageId",
  deleteUserChatMessage
);

server.listen(3332, () => {
  console.log("running at 3332");
});

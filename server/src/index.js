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
server.get("/user/:userId", getUser);
server.post("/login", signInUser);
server.post("/logout", signOutUser);

//Contacts
server.get("/user/:userId/contacts", getUserContacts);

//Chats
server.get("/user/:userId/chats", getUserChats);
server.get("/user/:userId/chat/:chatId", getUserChat);
server.post("/user/:userId/chat/:chatId", createUserChat);
server.patch("/user/:userId/chat/:chatId", updateUserChat);
server.delete("/user/:userId/chat/:chatId", deleteUserChat);

//Messages
server.post("/user/:userId/chat/:chatId/message", createUserChatMessage);
server.patch("/user/:userId/chat/:chatId/message/:messageId", updateUserChatMessage);
server.delete("/user/:userId/chat/:chatId/messages", deleteUserChatMessages);
server.delete(
  "/user/:userId/chat/:chatId/message/:messageId",
  deleteUserChatMessage
);

server.listen(3332, () => {
  console.log("running at 3332");
});

import { promises } from "fs";

export default class ChatService {
  constructor() {
    this.chats = null;
    this.readAllChats();
  }

  async readAllChats() {
    if (!this.chats) {
      this.chats = JSON.parse(await promises.readFile("./db/Chats.json")).data;
    }
    return this.chats;
  }

  async writeAllChats() {
    await promises.writeFile(
      "./db/Chats.json",
      JSON.stringify({ data: this.chats })
    );
  }

  readChats(userId) {
    return this.chats.filter((chat) => chat.userId === userId);
  }

  readChat(userId, chatId) {
    return this.chats.find(
      (chat) => chat.userId === userId && chat.chatId === chatId
    );
  }

  writeChat(userId, chatId) {
    let chat = this.readChat(userId, chatId);
    if (chat) {
      return chat;
    }
    chat = {
      userId: userId,
      chatId: chatId,
      message: "",
    };
    this.chats.push(chat);
    this.writeAllChats();
    return chat;
  }

  modifyChat(userId, chatId, chatData) {
    let chat = this.readChat(userId, chatId);
    if (!chat) {
      return null;
    }
    if (chatData.message !== undefined) {
      chat.message = chatData.message;
    }
    this.writeAllChats();
    return chat;
  }

  removeChat(userId, chatId) {
    this.chats = this.chats.filter(
      (chat) => chat.userId !== userId || chat.chatId !== chatId
    );
    this.writeAllChats();
  }
}

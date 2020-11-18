import { promises } from "fs";

export default class MessagesService {
  constructor() {
    this.messages = null;
    this.readAllMessages();
  }

  async readAllMessages() {
    if (!this.messages) {
      this.messages = JSON.parse(
        await promises.readFile("./db/Messages.json")
      ).data;
    }
    return this.messages;
  }

  async writeAllMessages() {
    await promises.writeFile(
      "./db/Messages.json",
      JSON.stringify({ data: this.messages })
    );
  }

  readMessage(userId, chatId, messageId) {
    return this.messages.find(
      (message) =>
        message.userId === userId &&
        message.chatId === chatId &&
        message.messageId === messageId
    );
  }

  readMessages(userId, chatId) {
    return this.messages.filter(
      (message) => message.userId === userId && message.chatId === chatId
    );
  }

  writeMessage(userId, chatId, messageId, messageData, write) {
    let message = {
      userId: userId,
      chatId: chatId,
      messageId: messageId ? messageId : Date.now().toString(),
      messageText: messageData.messageText,
      senderId: messageData.senderId,
      status: messageData.status ? messageData.status : "SENT",
    };
    this.messages.push(message);
    if (write) {
      this.writeAllMessages();
    }
    return message;
  }

  modifyMessage(userId, chatId, messageId, messageData) {
    let message = this.readMessage(userId, chatId, messageId);
    if (!message) {
      return null;
    }
    if (messageData.status !== undefined) {
      message.status = messageData.status;
    }
    this.writeAllMessages();
    return message;
  }

  removeMessages(userId, chatId) {
    this.messages = this.messages.filter(
      (message) => message.userId !== userId || message.chatId !== chatId
    );
    this.writeAllMessages();
  }

  removeMessage(userId, chatId, messageId) {
    this.messages = this.messages.filter(
      (message) =>
        message.userId !== userId ||
        message.chatId !== chatId ||
        message.messageId !== messageId
    );
    this.writeAllMessages();
  }
}

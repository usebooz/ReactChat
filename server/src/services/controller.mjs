import UsersService from "./UsersService.mjs";
import ContactsService from "./ContactsService.mjs";
import ChatsService from "./ChatsService.mjs";
import MessagesService from "./MessagesService.mjs";

const usersService = new UsersService();
const contactsService = new ContactsService();
const chatsService = new ChatsService();
const messagesService = new MessagesService();

//Users
export const getUser = async (req, res, next) => {
  res.json(usersService.readUser(req.params.userId));
};
export const signInUser = async (req, res, next) => {
  const user = usersService.readUser(req.body.userId);
  if (!user) {
    res.status(500);
    res.json({ userInvalid: true });
    return;
  }
  if (user.password !== req.body.password) {
    res.status(500);
    res.json({ passInvalid: true });
    return;
  }
  res.json(user);
};
export const signOutUser = async (req, res, next) => {
  res.json({});
};

//Contacts
export const getUserContacts = async (req, res, next) => {
  res.json(
    contactsService.readContacts(req.params.userId).map((contact) => {
      return { ...usersService.readUser(contact.contId) };
    })
  );
};

//Chats
const fillUserChat = (chat, messages) => {
  if (!chat) {
    return null;
  }
  return {
    ...usersService.readUser(chat.chatId),
    message: chat.message,
    messages: messages,
    lastMessage: messages.length
      ? messages[messages.length - 1].messageText
      : "",
    unreadCount: messages.reduce(
      (count, message) =>
        message.senderId === message.chatId && message.status === "SENT"
          ? ++count
          : count,
      0
    ),
  };
};
export const getUserChats = async (req, res, next) => {
  res.json(
    chatsService.readChats(req.params.userId).map((chat) => {
      const messages = messagesService.readMessages(chat.userId, chat.chatId);
      return fillUserChat(chat, messages);
    })
  );
};
export const getUserChat = async (req, res, next) => {
  res.json(
    fillUserChat(
      chatsService.readChat(req.params.userId, req.params.chatId),
      messagesService.readMessages(req.params.userId, req.params.chatId)
    )
  );
};
export const createUserChat = async (req, res, next) => {
  res.json(
    fillUserChat(
      chatsService.writeChat(req.params.userId, req.params.chatId),
      []
    )
  );
};
export const updateUserChat = async (req, res, next) => {
  res.json(
    fillUserChat(
      chatsService.modifyChat(req.params.userId, req.params.chatId, {
        ...req.body,
      }),
      messagesService.readMessages(req.params.userId, req.params.chatId)
    )
  );
};
export const deleteUserChat = async (req, res, next) => {
  chatsService.removeChat(req.params.userId, req.params.chatId);
  messagesService.removeMessages(req.params.userId, req.params.chatId);
  res.json({
    severity: "success",
    summary: "Success",
    detail: "Chat deleted",
  });
};

//Messages
export const createUserChatMessage = async (req, res, next) => {
  chatsService.writeChat(req.params.userId, req.params.chatId);
  const message = messagesService.writeMessage(
    req.params.userId,
    req.params.chatId,
    "",
    { ...req.body },
    false
  );
  chatsService.writeChat(req.params.chatId, req.params.userId);
  messagesService.writeMessage(
    message.chatId,
    message.userId,
    message.messageId,
    { ...message },
    true
  );
  res.json(message);
};
export const updateUserChatMessage = async (req, res, next) => {
  const message = messagesService.modifyMessage(
    req.params.userId,
    req.params.chatId,
    req.params.messageId,
    { ...req.body }
  );
  messagesService.modifyMessage(
    message.chatId,
    message.userId,
    message.messageId,
    { ...req.body }
  );
  res.json(message);
};
export const deleteUserChatMessages = async (req, res, next) => {
  messagesService.removeMessages(req.params.userId, req.params.chatId);
  res.json({
    severity: "success",
    summary: "Success",
    detail: "Chat cleared",
  });
};
export const deleteUserChatMessage = async (req, res, next) => {
  messagesService.removeMessage(
    req.params.userId,
    req.params.chatId,
    req.params.messageId
  );
  res.json({
    severity: "success",
    summary: "Success",
    detail: "Message deleted",
  });
};

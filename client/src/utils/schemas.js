import { schema } from "normalizr";

export const message = new schema.Entity(
  "messages",
  {},
  { idAttribute: (value) => value.messageId }
);

export const chat = new schema.Entity(
  "chats",
  { messages: [message] },
  { idAttribute: (value) => value.userId }
);

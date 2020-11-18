import { promises } from "fs";

export default class ContactsService {
  constructor() {
    this.contacts = null;
    this.readAllContacts();
  }

  async readAllContacts() {
    if (!this.contacts) {
      this.contacts = JSON.parse(
        await promises.readFile("./db/Contacts.json")
      ).data;
    }
    return this.contacts;
  }

  readContacts(userId) {
    return this.contacts.filter((contact) => contact.userId === userId);
  }
}

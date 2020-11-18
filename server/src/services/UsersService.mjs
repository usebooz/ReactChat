import { promises } from "fs";

export default class UserService {

  constructor() {
    this.users = null;
    this.readAllUsers();
  }

  async readAllUsers() {
    if (!this.users) {
      this.users = JSON.parse(await promises.readFile("./db/Users.json")).data;
    }
    return this.users;
  }

  readUser(userId) {
    return this.users.find((user) => user.userId === userId);
  }
}

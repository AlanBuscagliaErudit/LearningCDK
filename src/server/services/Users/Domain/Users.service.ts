import { ForRemoving } from "./../../Storage/Ports/ForRemoving.port";
import { ForLogging } from "./../Ports/ForLogging.port";
import { ForCreating } from "../../Storage/Ports/ForCreating.port";
import { ForEditing } from "../../Storage/Ports/ForEditing.port";
import { ForRetrieving } from "../../Storage/Ports/Retriever.port";

export interface User {
  account_id: string;
  company: string;
  email: string;
  name: string;
  userManagerLicenses: number;
}

export class UsersService {
  private userTable = process.env.TODO_TABLE_NAME as string;

  constructor(
    private logger: ForLogging,
    private retriever: ForRetrieving,
    private editor: ForEditing,
    private remover: ForRemoving,
    private creator: ForCreating
  ) {}

  async getUsers(): Promise<User[]> {
    this.logger.log("getUsers");
    return this.retriever.retrieveAll<User>(this.userTable);
  }

  async getUserById(id: string): Promise<User> {
    this.logger.log("getUserById");
    return this.retriever.retrieveById<User>(id, this.userTable);
  }

  async editUser(item: User): Promise<void> {
    this.logger.log("editUser");
    return this.editor.updateItemFromStorageById<User>(item, this.userTable);
  }

  async removeUser(id: string): Promise<void> {
    this.logger.log("removeUser id: " + id);
    await this.remover.removeItemFromStorageById(id, this.userTable);
  }

  async createUser(_body: User): Promise<void> {
    this.logger.log("createUser");
    return this.creator.createItem<User>(_body, this.userTable);
  }
}

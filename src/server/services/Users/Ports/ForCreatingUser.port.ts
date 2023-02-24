import { User } from "../Domain/Users.service";

export interface ForCreatingUser {
  createUser(body: User): Promise<void>;
}

import { User } from "../Domain/Users.service";

export interface ForEditingUser {
  editUser(body: User): Promise<void>;
}

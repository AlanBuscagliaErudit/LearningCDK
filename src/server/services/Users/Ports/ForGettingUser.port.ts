import { User } from "../Domain/Users.service";

export interface ForGettingUser {
  getUsers(): Promise<User[]>;
  getUserByid(id: string): Promise<User>;
}

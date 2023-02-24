import { User, UsersService } from "../../Domain/Users.service";
import { ForGettingUser } from "../../Ports/ForGettingUser.port";

export class UserGetter implements ForGettingUser {

  constructor(private userService: UsersService) {}
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }
  async getUserByid(id: string): Promise<User> {
    return this.userService.getUserById(id);
  }
}

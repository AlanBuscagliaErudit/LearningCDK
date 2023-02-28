import { User, UsersService } from "../../Domain/Users.service";
import { ForEditingUser } from "../../Ports/ForEditingUser.port";

export class UserEditor implements ForEditingUser {
  constructor(private userService: UsersService) {}

  async editUser(item: User): Promise<void> {
    await this.userService.editUser(item);
  }
}

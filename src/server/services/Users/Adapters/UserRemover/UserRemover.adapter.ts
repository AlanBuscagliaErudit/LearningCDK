import { UsersService } from "../../Domain/Users.service";
import { ForRemovingUser } from "../../Ports/ForRemovingUser.port";

export class UserRemover implements ForRemovingUser {
  constructor(
    private readonly userService: UsersService,
  ) {}

  async removeUser(id: string): Promise<void> {
   await this.userService.removeUser(id);
  }
}

import { User, UsersService } from "../../Domain/Users.service";
import { ForCreatingUser } from "../../Ports/ForCreatingUser.port";

export class UserCreator implements ForCreatingUser {
  constructor(private usersService: UsersService) {}

  async createUser(body: User): Promise<void> {
    await this.usersService.createUser(body);
  }
}

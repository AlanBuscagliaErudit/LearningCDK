import { UserCreator } from "./UserCreator.adapter";
import { userServiceMock } from "../../Domain/Users.mock.service";

export const userCreatorMock = new UserCreator(userServiceMock);

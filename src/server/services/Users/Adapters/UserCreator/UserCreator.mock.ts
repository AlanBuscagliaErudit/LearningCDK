import { UserCreator } from "./UserCreator.adapter";
import { userServiceMock } from "../../Domain/Users.service.mock";

export const userCreatorMock = new UserCreator(userServiceMock);

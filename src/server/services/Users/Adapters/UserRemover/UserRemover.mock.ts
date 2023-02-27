import { UserRemover } from "./UserRemover.adapter";
import { userServiceMock } from "../../Domain/Users.mock.service";

export const userRemoverMock = new UserRemover(userServiceMock);

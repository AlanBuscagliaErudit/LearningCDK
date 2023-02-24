import { UserRemover } from "./UserRemover.adapter";
import { userServiceMock } from "../../Domain/Users.service.mock";

export const userRemoverMock = new UserRemover(userServiceMock);
